import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { EDIT_ME } from '../../../apollo/mutations/user'
import { GET_ME } from '../../../apollo/queries/user'
import { CancelLink, NextButton } from '../../../components/Button'
import { ErrorText } from '../../../components/ErrorText'
import { Form, Label, TextArea, Input } from '../../../components/Form'
import { ProfileImage } from '../../../components/Image'
import Loading from '../../../components/Loading'
import { encodedImage } from '../../../helpers/helper'
import { Me } from '../../../ts/user'

import { InputImage, InputDate } from '../style'

type Inputs = {
  image: any
  name: string
  bio: string
  dateOfBirth: Date
}

const EditAccount = () => {
  const history = useHistory()
  const [nameDuplicateErrorMessage, setNameDuplicateErrorMessage] = useState('')
  const [previewSource, setPreviewSource] = useState('')

  const { loading, data } = useQuery(GET_ME)
  const [editMe, { loading: mutationLoading }] = useMutation(EDIT_ME, {
    fetchPolicy: 'network-only',
  })

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onChange' })
  const watchImageField = watch('image')
  const watchNameField = watch('name')
  const onSubmit: SubmitHandler<Inputs> = async data => {
    let body
    try {
      if (data.image.length) {
        const encodedImageResult = await encodedImage(data.image[0])
        body = {
          image: encodedImageResult,
          imageId: me.displayImageId,
          name: data.name,
          bio: data.bio,
          dateOfBirth: data.dateOfBirth,
        }
      } else {
        body = {
          image: me.displayImage,
          imageId: me.displayImageId,
          name: data.name,
          bio: data.bio,
          dateOfBirth: data.dateOfBirth,
        }
      }
      try {
        const res = await editMe({
          variables: { input: body },
          refetchQueries: ({ data }) =>
            data.editMe.error.path === 'success' ? [{ query: GET_ME }] : [],
        })
        if (res.data.editMe.error.path === 'success') {
          history.push('/account')
        }
        if (res.data.editMe.error.path === 'name') {
          setNameDuplicateErrorMessage(res.data.editMe.error.message)
        }
      } catch (error) {
        console.log(JSON.stringify(error, null, 2))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const previewFile = (file: Blob) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result as any)
    }
  }
  if (watchImageField) {
    if (watchImageField.length) {
      const image = watchImageField[0]
      if (
        image.type === 'image/jpeg' ||
        image.type === 'image/png' ||
        image.type === 'image/jpg'
      ) {
        previewFile(image)
      }
    }
  }
  if (loading) return <Loading />
  const me: Me = data.me
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputImage>
          <div>
            <ProfileImage src={previewSource || me.displayImage} />
          </div>
          <p>{watchNameField || me.name}</p>
          <input
            {...register('image', {
              required: true,
              validate: {
                lessThan10MB: (files: { size: number }[]) =>
                  files[0].size < 10000000,
                acceptedFormats: (files: { type: string }[]) =>
                  ['image/jpeg', 'image/png', 'image/jpg'].includes(
                    files[0]?.type
                  ),
              },
            })}
            type='file'
            accept='.jpg, .jpeg, .png'
          />
        </InputImage>
        {errors.image?.type === 'required' && (
          <ErrorText>Wajib mengupload gambar</ErrorText>
        )}
        {errors.image?.type === 'lessThan10MB' && (
          <ErrorText>Max 10 MB</ErrorText>
        )}
        {errors.image?.type === 'acceptedFormats' && (
          <ErrorText>Masukan sesuai format (png,jpg,jpeg)</ErrorText>
        )}
        <Label>
          Nama <span>*</span>
        </Label>
        <Input
          {...register('name', { required: true, maxLength: 15 })}
          defaultValue={me.name}
          type='text'
        />
        {errors.name?.type === 'required' && (
          <ErrorText>Wajib memasukan nama</ErrorText>
        )}
        {errors.name?.type === 'maxLength' && (
          <ErrorText>Nama terlalu panjang minimal (15 huruf)</ErrorText>
        )}
        {nameDuplicateErrorMessage && <p>{nameDuplicateErrorMessage}</p>}
        <Label>
          Tanggal lahir <span>*</span>
        </Label>
        <InputDate
          {...register('dateOfBirth', {
            required: true,
          })}
          defaultValue={new Date(me.dateOfBirth).toISOString().substr(0, 10)}
          type='date'
        />
        {errors.dateOfBirth?.type === 'required' && (
          <ErrorText>Wajib memasukan Tanggal lahir</ErrorText>
        )}
        <Label>
          Bio singkat <span>*</span>
        </Label>
        <TextArea
          {...register('bio', { required: true })}
          defaultValue={me.bio}
        />
        {errors.bio?.type === 'required' && <p>Wajib memasukan Bio</p>}
        {mutationLoading ? (
          <NextButton type='submit' disabled>
            Submit
          </NextButton>
        ) : (
          <>
            <NextButton type='submit'>Simpan perubahan</NextButton>
            <CancelLink to='/account'>Batal mengedit profile</CancelLink>
          </>
        )}
      </Form>
    </div>
  )
}

export default EditAccount
