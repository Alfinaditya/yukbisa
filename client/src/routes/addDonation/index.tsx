import { useMutation } from '@apollo/client'
import { FormEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useHistory } from 'react-router'
import { getAccessToken } from '../../auth/accessToken'
import { Token } from '../../ts/token'
import { ADD_DONATION } from '../../apollo/mutations/userDonation'
import {
  GET_CAMPAIGNS,
  GET_CAMPAIGN_DETAILS,
} from '../../apollo/queries/campaign'
import { GET_MY_DONATIONS } from '../../apollo/queries/userDonation'
import { Form, Label, TextArea } from '../../components/Form'
import { CancelLink, NextButton } from '../../components/Button'
import { Currency } from '../galangDana/addCampaign/style'
import { Helmet } from 'react-helmet'

const Donation = () => {
  const history = useHistory()
  const [amount, setAmount] = useState<any>('')
  const [message, setMessage] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const search = useLocation().search
  const token: Token = jwtDecode(getAccessToken())
  const slug = new URLSearchParams(search).get('slug')
  console.log(slug)
  const [addDonation, { loading, error }] = useMutation(ADD_DONATION, {
    fetchPolicy: 'network-only',
    refetchQueries: [
      { query: GET_CAMPAIGNS },
      { query: GET_CAMPAIGN_DETAILS, variables: { input: slug } },
      { query: GET_MY_DONATIONS, variables: { input: token.id } },
    ],
  })
  if (error) {
    console.log(JSON.stringify(error, null, 2))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const body = {
      userId: token.id,
      amount: parseInt(amount),
      message,
      endPoint: slug,
      anonymous: anonymous,
    }
    await addDonation({ variables: { input: body } })
    history.push(`/campaign/${slug}`)
  }
  return (
    <div>
      <Helmet>
        <title>Donasi sekarang</title>
        <meta name='description' content='Donasi sekarang' />
        <link
          rel='canonical'
          href={`https://yukbisa.netlify.app/campaign/${slug}/donation?slug=${slug}`}
        />
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <Label>
          Isi nominal donasi <span>*</span>
        </Label>
        <Currency
          placeholder='Masukan angka'
          prefix={'Rp. '}
          decimalsLimit={2}
          value={amount}
          required={true}
          onValueChange={value => setAmount(value)}
        />
        <Label>Sembunyikan nama saya (donasi anonim)</Label>
        <input
          defaultChecked={anonymous}
          onChange={() => setAnonymous(!anonymous)}
          type='checkbox'
        />
        <Label>Beri semangat (opsional)</Label>
        <TextArea
          value={message}
          onChange={e => setMessage(e.target.value)}
          name='message'
        />
        {!loading ? (
          <NextButton type='submit'>Donasi sekarang !</NextButton>
        ) : (
          <NextButton type='submit' disabled>
            Loading...
          </NextButton>
        )}
        {/* <NextButton type='submit'>Donasi sekarang !</NextButton> */}
        <CancelLink to={`campaign/${slug}`}>Batal donasi</CancelLink>
      </Form>
    </div>
  )
}

export default Donation
