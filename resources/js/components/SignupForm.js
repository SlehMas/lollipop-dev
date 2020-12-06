import React, { useState } from 'react'
import classnames from 'classnames'

import inscriptionService from '../services/inscription.service'

const SignupForm = (props) => {

  const [page, setPage] = useState(1)
  const [formError, setFormError] = useState({})

  const checkCurrentFormation = (niveau) => props.currentFormation.find(
    cf => cf.niveau.name.toLowerCase() === niveau.toLowerCase()
  )

  const showPlural = () => props.currentFormation.length > 1 ? 's' : ''

  const formSubmit = (e) => {
    let tmpErr = {}
    setFormError(tmpErr)
    e.preventDefault()
    const LETTERS_REGEX = /^[A-Za-z]+$/
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const data = new FormData(event.target);
    const prenom = data.get('prenom')
    const nom = data.get('nom')
    const email = data.get('email')
    const level = data.get('level')
    const domain = data.get('domain')
    const experience = data.get('experience')
    const ideeProjet = data.get('idee-projet')
    const adresse = data.get('adresse')
    const age = data.get('age')
    const telephone = data.get('telephone')

    if (!prenom.match(LETTERS_REGEX)) tmpErr.prenomError = true
    if (!nom.match(LETTERS_REGEX)) tmpErr.nomError = true
    if (!email.match(EMAIL_REGEX)) tmpErr.emailError = true
    if (!level) tmpErr.levelError = true
    if (!domain) tmpErr.domainError = true
    if (!experience) tmpErr.expError = true
    if (!adresse) tmpErr.addressError = true
    if (!age) tmpErr.ageError = true
    if (!telephone) tmpErr.phoneError = true

    if (props.currentFormation.length < 1) {
      tmpErr.formationError = true
    }
    setFormError(tmpErr)

    if (Object.keys(tmpErr).length) {
      return
    }

    const newInscription = {
      prenom,
      nom,
      email,
      niveau: level,
      domaine: domain,
      experience,
      adresse,
      age,
      telephone,
      idee_projet: ideeProjet,
    }
    props.currentFormation.forEach(cf => {
      newInscription.id_formation = cf.id
      inscriptionService.save(newInscription).then(res => {})
        .catch(err => err)
    })
  }

  const NiveauxBtns = () => {
    return props.formations.map(n => {
      return <button style={{ 
        textTransform: 'capitalize', 
        backgroundColor: checkCurrentFormation(n.name) ? n.color : 'transparent' 
      }} 
      key={n.name} className="btn btn-lollipop-sec mr-3 pr-3">
        <img src="../../assets/icons/debutant.png" width="10" className="mr-3" />
        {n.name}
      </button>
    })
  }
  return (
    <div className="SignupForm">
      <fieldset  style={props.isLoading || props.formations.length < 1 ? {
      opacity: '0.3'
    } : {}} disabled={props.formations.length < 1}>
        <div>
          <h3>S’inscrire</h3>
          {
            props.currentFormation.length > 0
            &&
            <div className="mt-1 ml-1">
              {props.currentFormation.length} formation{showPlural()} séléctionnée{showPlural()}:
              {props.currentFormation.map(cf => <h5>{cf.nom}</h5>)}
              
          </div>
          }
          <br />
          {
            (formError && formError.formationError) && <React.Fragment>

              <p className="error">Veuillez choisir une formation.</p>
            </React.Fragment>
          }
        </div>
        <div className="mt-4">
          <NiveauxBtns />
        </div>

        <form className="mt-3" name="signup" id="signup" onSubmit={formSubmit}>
          <div id="page1" style={page == 1 ? { display: 'block' } : { display: 'none' }}>
            <input type="text" name="nom" placeholder="Nom *" className="lollipop-input mb-4" />
            {(formError && formError.nomError) && <p className="error">Verifiez votre nom.</p>}
            <input type="text" name="prenom" placeholder="Prénom *" className="lollipop-input mb-4" />
            {(formError && formError.prenomError) && <p className="error">Verifiez votre prénom.</p>}
            <input type="email" name="email" placeholder="Adresse email *" className="lollipop-input mb-4" />
            {(formError && formError.emailError) && <p className="error">Verifiez votre nom.</p>}

            <div className="mb-3">
              <h6>Niveau de connaissance en UX Design</h6>
              <input type="radio" id="débutant" name="level" value="débutant" />
              <label htmlFor="débutant" className="pl-2">Débutant</label><br />
              <input type="radio" id="Intermédiare" name="level" value="intermédiare" />
              <label htmlFor="Intermédiare" className="pl-2">Intermédiare</label><br />
              <input type="radio" id="avancé" name="level" value="avancé" />
              <label htmlFor="avancé" className="pl-2">Avancé</label><br />
              <input type="radio" id="autre" name="level" value="autre" />
              <label htmlFor="autre" className="pl-2">Autre</label>
            </div>
            {(formError && formError.levelError) && <p className="error">Veuillez choisir un niveau.</p>}
            <div>
              <h6>Domaine de connaissance en UX Design</h6>
              <input type="radio" id="designer" name="domain" value="designer" />
              <label htmlFor="designer" className="pl-2">Designer</label><br />
              <input type="radio" id="webdesigner" name="domain" value="web designer" />
              <label htmlFor="webdesigner" className="pl-2">Web designer</label><br />
              <input type="radio" id="developpeur" name="domain" value="developpeur" />
              <label htmlFor="developpeur" className="pl-2">Developpeur</label><br />
              <input type="radio" id="chefdeprojet" name="domain" value="chef de projet" />
              <label htmlFor="chefdeprojet" className="pl-2">Chef de projet</label><br />
              <input type="radio" id="eseignant" name="domain" value="enseignant" />
              <label htmlFor="eseignant" className="pl-2">Enseignant</label><br />
              <input type="radio" id="autre" name="domain" value="autre" />
              <label htmlFor="autre" className="pl-2">Autre</label>
            </div>
            {(formError && formError.domainError) && <p className="error">Veuillez choisir un domaine.</p>}
          </div>

          <div id="page2" style={page == 2 ? { display: 'block' } : { display: 'none' }}>
            <div className="mt-3">
              <h6>Est ce que vouz avez travaillé sur des applications mobileset/ou des sites auparavant?*</h6>
              <input type="radio" id="oui" name="experience" value="oui" />
              <label htmlFor="oui" className="pl-2">Oui</label><br />
              <input type="radio" id="non" name="experience" value="non" />
              <label htmlFor="non" className="pl-2">Non</label><br />
              <input type="radio" id="autre" name="experience" value="autre" />
              <label htmlFor="autre" className="pl-2">Autre</label><br />
            </div>
            {(formError && formError.expError) && <p className="error">Veuillez choisir une valeur.</p>}
            <div className="mt-3">
              <h6>Pour la formation spéciale etrepreneurs, parler nous de votre idée de projet
              (recommandé poir être selectionné pour la formation)</h6>
              <textarea cols="62" className="idea-textarea" name="idee-projet"></textarea>
            </div>
            <div className="mt-3">
              <input type="text" placeholder="Adresse *" name="adresse" className="lollipop-input mb-4" />
              {(formError && formError.addressError) && <p className="error">Verifiez votre adresse.</p>}
              <input type="number" placeholder="Votre âge *" name="age" className="lollipop-input mb-4" />
              {(formError && formError.ageError) && <p className="error">Verifiez votre age.</p>}
              <input type="phone" placeholder="Numéro de téléphone *" name="telephone" className="lollipop-input mb-4" />
              {(formError && formError.phoneError) && <p className="error">Verifiez votre téléphone.</p>}
            </div>
            <div className="ml-auto" style={{ maxWidth: '170px' }}>
              <button className="btn btn-lollipop-prim" type="submit">Valider</button>
            </div>
          </div>

        </form>

        <div className="pagination">
          <ul className={page == 1 ? "pagination-list ml-auto" : "pagination-list mr-auto"}>
            <li style={page == 2 ? { display: 'inline' } : { display: 'none' }}>
              <span onClick={() => setPage(1)}>Previous</span>
              {/* <i className="fa fa-angle-left" ></i> */}
            </li>
            <li className={page == 1 ? 'active' : ''}>1</li>
            <li className={page == 2 ? 'active' : ''}>2</li>
            <li style={page == 1 ? { display: 'inline' } : { display: 'none' }}>
              <span onClick={() => setPage(2)}>Next</span>
              {/* <i className="fa fa-angle-right" onClick={() => setPage(2)}></i> */}
            </li>
          </ul>
        </div>
      </fieldset>
    </div>
  )
}

export default SignupForm