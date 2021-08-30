import { useLocation } from 'react-router-dom'

const Donation = () => {
  const search = useLocation().search
  const slug = new URLSearchParams(search).get('slug')
  return (
    <div>
      <h1>Halloo gang kuontol</h1>
      <p>Halo</p>
    </div>
  )
}

export default Donation
