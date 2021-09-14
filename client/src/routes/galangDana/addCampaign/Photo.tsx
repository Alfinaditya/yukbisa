import React, { useContext } from 'react'
import { Form, NextButton, PreviousButton } from './style'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useHistory } from 'react-router'
import { AddCampaignContext } from '../../../context/addCampaignContext'
type Inputs = {
  image: any
}
const Photo = () => {
  const history = useHistory()
  const context = useContext(AddCampaignContext)
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
  })
  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log(data)
    context?.setImage(data.image[0])
    history.push('/galang-dana/add-campaign/story')
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <label>Pilih salah satu foto utama untuk penggalan danamu</label>
      <input
        {...register('image', {
          required: true,
          validate: {
            lessThan10MB: (files: { size: number }[]) =>
              files[0].size < 10000000,
            acceptedFormats: (files: { type: string }[]) =>
              ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0]?.type),
          },
        })}
        type='file'
        accept='.jpg, .jpeg, .png'
      />
      {errors.image?.type === 'required' && <p>Wajib mengupload gambar</p>}
      {errors.image?.type === 'lessThan10MB' && <p>Max 10 MB</p>}
      {errors.image?.type === 'acceptedFormats' && (
        <p>Masukan sesuai format (jpg,png,jpeg)</p>
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
