import React from 'react'
import {
  Row,
  Col
} from 'reactstrap'

const LaTeam = () => {

  return <div className="LaTeam container mt-5">
    <h1>Lollipop Training</h1>
    <p>Est une jeune équipe dynamique enthousiaste ,
      avec beaucoup d’ambition et de savoir faire</p>
    <Row className="mt-5">
      <Col md={4} xs={12} className="member">
        <img className="img-fluid member_image" src="../../assets/nouha.jpg"/>
        <div className="info mt-2">
          <h2>Nouha Jaafar</h2>
          <p>CEO &amp; Founder</p>
          <ul className="links">
            <li>
              <a href="https://twitter.com/noha_jaafar" target="_blank">
                <img src="../../assets/twitter-500px.svg" width="30" className="img-fluid"/>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/nouha-jaafar-64a8451a/" target="_blank">
                <img src="../../assets/linkedin-500px.svg" width="30" className="img-fluid"/>
              </a>
            </li>
          </ul>
        </div>
      </Col>

      <Col md={4} xs={12} className="member">
        <img className="img-fluid member_image" src="../../assets/medamine.jpg"/>
        <div className="info mt-2">
          <h2>Med Amine Ben Aissia</h2>
          <p>Technico Commercial</p>
          <ul className="links">
            <li>
              <a href="https://www.linkedin.com/in/med-amine-ben-aissia-8811bb91/" target="_blank">
                <img src="../../assets/linkedin-500px.svg" width="30" className="img-fluid"/>
              </a>
            </li>
          </ul>
        </div>
      </Col>

      <Col md={4} xs={12} className="member">
        <img className="img-fluid member_image" src="../../assets/nesrine.png"/>
        <div className="info mt-2">
          <h2>Nessrine Mourou</h2>
          <p>Chef de projet Design et Communication</p>
          <ul className="links">
            <li>
              <a href="https://www.linkedin.com/in/nesrine-mourou-847ba2144/" target="_blank">
                <img src="../../assets/linkedin-500px.svg" width="30" className="img-fluid"/>
              </a>
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  </div>
}

export default LaTeam
