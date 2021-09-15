import { useMutation } from '@apollo/client'
import { FormEvent, useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
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

const Donation = () => {
  const history = useHistory()
  const [amount, setAmount] = useState<any>('')
  const [message, setMessage] = useState('')
  const search = useLocation().search
  const token: Token = jwtDecode(getAccessToken())
  const slug = new URLSearchParams(search).get('slug')

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
    }
    await addDonation({ variables: { input: body } })
    history.push(`/campaign/${slug}`)
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
