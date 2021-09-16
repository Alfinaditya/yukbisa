import React, { useContext, useState, useEffect } from 'react'
import { ContainerImage, HeaderForm, InputImage, PreviewImage } from './style'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Redirect, useHistory } from 'react-router'
import { AddCampaignContext } from '../../../context/addCampaignContext'
import { Image } from '../../../components/Image'
import { Form, Label } from '../../../components/Form'
import { ErrorText } from '../../../components/ErrorText'
import { NextButton, PreviousButton } from '../../../components/Button'
type Inputs = {
  image: any
}

const Photo = () => {
  const history = useHistory()
  const ctx = useContext(AddCampaignContext)

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
  })
  const watchImageField = watch('image')
  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log(data)
    ctx?.setImage(data.image[0])
    history.push('/galang-dana/add-campaign/story')
  }

  const previewFile = (file: Blob) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      ctx?.setPreviewSource(reader.result as any)
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {ctx?.beneficiaryName === '' &&
        ctx.title === '' &&
        ctx.endPoint === '' &&
        ctx.purposeDescription === '' &&
        ctx.target === '' && (
          <Redirect to='/galang-dana/add-campaign/beneficiary' />
        )}
      <HeaderForm>Tunjukan perjuanganmu pada donatur</HeaderForm>
      <Label image>
        Pilih salah satu foto utama untuk penggalan danamu <span> *</span>
      </Label>
      <Label sub>Format foto harus PNG/JPG/JPEG</Label>
      {ctx?.previewSource && (
        <PreviewImage>
          <Image
            src={ctx?.previewSource}
            style={{ height: '500px' }}
            alt='preview-image'
          />
        </PreviewImage>
      )}
      <InputImage>
        Upload Foto
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
      <NextButton disabled={!isValid}>Selanjutnya</NextButton>
      <PreviousButton
        onClick={() => history.push('/galang-dana/add-campaign/details')}
      >
        Sebelumnya
      </PreviousButton>
    </Form>
  )
}

export default Photo
