import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Register from './routes/entry/register'

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <h1>Yuk Bisa</h1>
            <Link to='/register'>Register</Link>
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
