import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <Link to='/login'>Login</Link>
      <br />
      <Link to='/register'>Register</Link>
      <br />
      <Link to='/'>Yuk Bisa</Link>
      <br />
      <Link to='/account'>Account</Link>
    </div>
  )
}

export default Navbar
