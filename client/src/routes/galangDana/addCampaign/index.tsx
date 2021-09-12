import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import 'react-phone-input-2/lib/material.css'
import { createEndpoint, encodedImage } from '../../../helpers/helper'
import { useMutation } from '@apollo/client'
import { ADD_CAMPAIGN } from '../../../apollo/mutations/campaign'
import {
  GET_CAMPAIGNS,
  GET_MY_CAMPAIGNS,
} from '../../../apollo/queries/campaign'
import { Token } from '../../../ts/token'
import jwtDecode from 'jwt-decode'
import { getAccessToken } from '../../../auth/accessToken'
import { useHistory } from 'react-router'
import {
  NextButton,
  PreviousButton,
  ContainerForm,
  Form,
  TextArea,
} from './style'
import BeneficiaryForm from './components/BeneficiaryForm'
import DetailsForm from './components/DetailsForm'

export type Inputs = {
  beneficiaryName: string
  title: string
  endPoint: string
  purposeDescription: string
  image: any
  story: string
}

const Campaign = () => {
  const history = useHistory()
  const token: Token = jwtDecode(getAccessToken())
  const [target, setTarget] = useState<string | undefined>('0')
  const [page, setPage] = useState(1)
  const [endPoint, setEndPoint] = useState('')
  const [endPointDuplicateErrorMessage, setEndPointDuplicateErrorMessage] =
    useState('')
  const [receiver, setReceiver] = useState('me')
  const [addCampaign, { data, loading, error }] = useMutation(ADD_CAMPAIGN, {
    fetchPolicy: 'network-only',
  })
  const [phoneNumber, setPhoneNumber] = useState('')
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: { beneficiaryName: token.name },
  })
  if (error) {
    console.log(JSON.stringify(error, null, 2))
  }

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const encodedImageResult = await encodedImage(data.image[0])
      const body = {
        beneficiaryName: data.beneficiaryName,
        title: data.title,
        endPoint: createEndpoint(data.endPoint),
        target: parseInt(target!),
        phoneNumber: phoneNumber,
        purposeDescription: data.purposeDescription,
        image: encodedImageResult,
        story: data.story,
      }
      try {
        const res = await addCampaign({
          variables: { input: body },
          refetchQueries: ({ data }) =>
            data.addCampaign.error.path === 'success'
              ? [
                  { query: GET_CAMPAIGNS },
                  {
                    query: GET_MY_CAMPAIGNS,
                    variables: { fundraiserId: token.id },
                  },
                ]
              : [],
        })
        if (res.data.addCampaign.error.path === 'success') {
          setEndPoint(createEndpoint(data.endPoint))
          setPage(page + 1)
        }
        if (res.data.addCampaign.error.path === 'endPoint') {
          setPage(2)
          setEndPointDuplicateErrorMessage(res.data.addCampaign.error.message)
        }
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ContainerForm>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {page === 1 && (
          <>
            <BeneficiaryForm
              receiver={receiver}
              setReceiver={setReceiver}
              register={register}
              isValid={isValid}
              errors={errors}
              page={page}
              setPage={setPage}
            />
          </>
        )}
        {page === 2 && (
          // Details
          <>
            <DetailsForm
              register={register}
              isValid={isValid}
              errors={errors}
              page={page}
              endPointDuplicateErrorMessage={endPointDuplicateErrorMessage}
              setPage={setPage}
              target={target}
              setTarget={setTarget}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          </>
        )}
        {page === 3 && (
          // photo
          <>
            <label>Pilih salah satu foto utama untuk penggalan danamu</label>
            <input
              {...register('image', {
                required: true,
              })}
              accept='.jpg, .jpeg, .png'
              type='file'
            />
            {errors.image?.type === 'required' && (
              <p>Wajib mengupload gambar</p>
            )}
            <NextButton onClick={() => setPage(page + 1)} disabled={!isValid}>
              Selanjutnya
            </NextButton>
            <PreviousButton onClick={() => setPage(page - 1)}>
              Sebelumnya
            </PreviousButton>
          </>
        )}
        {page === 4 && (
          // finish
          <div>
            <label>
              Untuk memudahkanmu,kami membuat informasi yang kamu masukan
              menjadi cerita penggalangan dana. kamu dapat mengubah cerita di
              bawah ini sesuai keinginanmu.
            </label>
            <TextArea
              {...register('story', {
                required: true,
              })}
            />
            {errors.story?.type === 'required' && <p>Wajib diisi</p>}
            {loading ? (
              <button type='submit' disabled>
                Tunggu sebentar.....
              </button>
            ) : (
              <NextButton type='submit' disabled={!isValid}>
                Submit
              </NextButton>
            )}
            <PreviousButton onClick={() => setPage(page - 1)}>
              Sebelumnya
            </PreviousButton>
          </div>
        )}
        {page === 5 && (
          // finish
          <div>
            <h1>Pembayaran Berhasil</h1>
            <button onClick={() => history.push(`/campaign/${endPoint}`)}>
              Lihat penggalangan dana
            </button>
          </div>
        )}
      </Form>
    </ContainerForm>
  )
}

export default Campaign
