import React, { useContext } from 'react'
import { Form, NextButton, PreviousButton, TextArea } from './style'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AddCampaignContext } from '../../../context/addCampaignContext'
import { useHistory } from 'react-router'
type Inputs = {
  story: string
}
const Story = () => {
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
    context?.setStory(data.story)
    history.push('/galang-dana/add-campaign/result')
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Untuk memudahkanmu,kami membuat informasi yang kamu masukan menjadi
        cerita penggalangan dana. kamu dapat mengubah cerita di bawah ini sesuai
        keinginanmu.
      </label>
      <TextArea
        {...register('story', {
          required: true,
        })}
      />
      {errors.story?.type === 'required' && <p>Wajib diisi</p>}
      {/* {loading ? (
        <button type='submit' disabled>
          Tunggu sebentar.....
        </button>
      ) : (
        <NextButton type='submit' disabled={!isValid}>
          Submit
        </NextButton>
      )} */}
      <NextButton type='submit' disabled={!isValid}>
        Submit
      </NextButton>
      <PreviousButton
        onClick={() => history.push('/galang-dana/add-campaign/photo')}
      >
        Sebelumnya
      </PreviousButton>
    </Form>
  )
}

export default Story
