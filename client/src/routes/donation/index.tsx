import { useMutation } from '@apollo/client'
import { FormEvent, useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { useLocation } from 'react-router-dom'
import { ADD_DONATION } from '../../apollo/mutations/userDonation'
import { getAccessToken } from '../../auth/accessToken'
import jwtDecode from 'jwt-decode'
import {
  GET_CAMPAIGNS,
  GET_CAMPAIGN_BY_ENDPOINT,
} from '../../apollo/queries/campaign'
interface Token {
  id: string
  name: string
  image: string
}
const Donation = () => {
  const [amount, setAmount] = useState<any>('')
  const [message, setMessage] = useState('')
  const search = useLocation().search
  const token: Token = jwtDecode(getAccessToken())
  const slug = new URLSearchParams(search).get('slug')
  const [addDonation, { data, loading, error }] = useMutation(ADD_DONATION, {
    fetchPolicy: 'network-only',
    refetchQueries: [
      { query: GET_CAMPAIGNS },
      { query: GET_CAMPAIGN_BY_ENDPOINT, variables: { input: slug } },
    ],
  })
  console.log(token)
  if (error) {
    console.log(JSON.stringify(error, null, 2))
  }
  if (data) {
    console.log(data)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const body = {
      name: token.name,
      image: token.image,
      amount: parseInt(amount),
      message,
      endPoint: slug,
    }
    addDonation({ variables: { input: body } })
    console.log(body)
  }
  return (
    <div>
      <h1>Halloo gang kuontol</h1>
      <p>Halo</p>
      <form onSubmit={handleSubmit}>
        <label>Isi nominal donasi</label>
        <CurrencyInput
          placeholder='Masukan angka'
          prefix={'Rp. '}
          decimalsLimit={2}
          value={amount}
          required={true}
          onValueChange={value => setAmount(value)}
        />
        <label>Beri semangat (opsional)</label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          name='message'
        />
        {!loading ? (
          <button type='submit'>Submit</button>
        ) : (
          <button type='submit' disabled>
            Loading...
          </button>
        )}
      </form>
    </div>
  )
}

export default Donation
