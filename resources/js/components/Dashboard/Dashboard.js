import React from 'react';

import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom'
import {
  Row,
  Col
} from 'reactstrap'

import SideNav from './SideNav'
import Formations from './Formations'
import Inscription from './Inscription'
import FormationForm from './FormationForm'
import Categorie from './Categorie'
import Niveau from './Niveau'
import Message from './Message'
import SingleMessage from './SingleMessage'
import Certificat from './Certificat'
import Lieu from './Lieu'
import Blog from './Blog'
import BlogForm from './BlogForm'

const Dashboard = () => {

  return (
    <div className="Dashboard">
      <BrowserRouter>
        <Row className="page-wrapper chiller-theme toggled">
          <Col xs={3}>
            <SideNav />
          </Col>

          <Col xs={9} className="page-content">
            <Switch>
              <Route exact path="/dashboard" component={() => <p>This is home!</p>} />
              <Route exact path="/dashboard/formations" component={Formations} />
              <Route exact path="/dashboard/formations/new" component={FormationForm} />
              <Route exact path="/dashboard/formations/:id" component={FormationForm} />
              <Route exact path="/dashboard/inscription" component={Inscription} />
              <Route exact path="/dashboard/categorie" component={Categorie} />
              <Route exact path="/dashboard/certificat" component={Certificat} />
              <Route exact path="/dashboard/niveau" component={Niveau} />
              <Route exact path="/dashboard/lieu" component={Lieu} />
              <Route exact path="/dashboard/blog" component={Blog} />
              <Route exact path="/dashboard/blog/new" component={BlogForm} />
              <Route exact path="/dashboard/blog/:id" component={BlogForm} />
              <Route exact path="/dashboard/messages" component={Message} />
              <Route exact path="/dashboard/messages/:id" component={SingleMessage} />

              
            </Switch>
          </Col>
        </Row>
      </BrowserRouter>
    </div>
  )
}

export default Dashboard