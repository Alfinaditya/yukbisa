import React, { useContext } from 'react'
import { Checkbox } from './style'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AddCampaignContext } from '../../../context/addCampaignContext'
import { Redirect, useHistory } from 'react-router'
import { Form, Label, TextArea } from '../../../components/Form'
import { ErrorText } from '../../../components/ErrorText'
import { NextButton, PreviousButton } from '../../../components/Button'
type Inputs = {
  story: string
  agreement: boolean
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
      {context?.beneficiaryName === '' &&
        context.title === '' &&
        context.endPoint === '' &&
        context.purposeDescription === '' &&
        context.image === '' &&
        context.target === '' && (
          <Redirect to='/galang-dana/add-campaign/beneficiary' />
        )}
      <Label>
        Untuk memudahkanmu,kami membuat informasi yang kamu masukan menjadi
        cerita penggalangan dana. kamu dapat mengubah cerita di bawah ini sesuai
        keinginanmu. <span>*</span>
      </Label>
      <TextArea
        {...register('story', {
          required: true,
        })}
      />
      {errors.story?.type === 'required' && <ErrorText>Wajib diisi</ErrorText>}
      <Checkbox>
        <input
          type='checkbox'
          {...register('agreement', {
            required: true,
          })}
        />
        <p>
          saya setuju dengan Syarat & ketentuan Donasi di Yukbisa,termasuk biaya
          administrasi platform sebesar 69% dari total donasi online yang
          terkumpul.
        </p>
      </Checkbox>
      {errors.agreement?.type === 'required' && (
        <ErrorText>Wajib mencentang persetujuan</ErrorText>
      )}
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
