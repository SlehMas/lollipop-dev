import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Link, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Signup from './Signup'
import LaTeam from './LaTeam'
import Certification from './Certification'
import Dashboard from './Dashboard/Dashboard'

const NotFound = () => {

  return <div style={{
    margin: 'auto',
    marginTop: '11%',
    textAlign: 'center'
  }}>
    <h1>Page introuvable! :(</h1>
    <a href='/'>Retour vers l'accueil</a>
  </div>
}


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          {!window.location.pathname.includes('/dashboard') && !window.location.pathname.includes('/cert') && <Header />}
          <Switch>
            <Route exact path='/inscription' component={Signup} />
            <Route path='/team' component={LaTeam} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/cert/:id' component={Certification} />
            <Route component={NotFound} />
          </Switch>
          {!window.location.pathname.includes('/dashboard') && <Footer/>}
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))