import React, { useState } from 'react'

import inscriptionService from '../services/inscription.service'

const SignupForm = (props) => {

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
    const profession = data.get('profession')
    const motivation = data.get('idee-projet')
    const adresse = data.get('adresse')
    const ville = data.get('ville')
    const age = data.get('age')
    const telephone = data.get('telephone')

    if (!prenom.match(LETTERS_REGEX)) tmpErr.prenomError = true
    if (!profession.match(LETTERS_REGEX)) tmpErr.professionError = true
    if (!nom.match(LETTERS_REGEX)) tmpErr.nomError = true
    if (!email.match(EMAIL_REGEX)) tmpErr.emailError = true
    if (!adresse) tmpErr.addressError = true
    if (!ville) tmpErr.villeError = true
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
      adresse,
      ville,
      age,
      telephone,
      profession,
      motivation
    }
    console.log(newInscription)
    props.currentFormation.forEach(cf => {
      newInscription.id_formation = cf.id
      inscriptionService.save(newInscription).then(res => {
        props.setDone(true)
      })
        .catch(err => { })
    })
  }

  const NiveauxBtns = () => {
    let niveaux = props.formations.filter((t, index) => props.formations.findIndex(n => n.name === t.name) === index)
    return niveaux.map(n => {
      return <button style={{
        textTransform: 'capitalize',
        backgroundColor: checkCurrentFormation(n.name) ? n.color : 'transparent'
      }}
        key={n.name} className="btn btn-lollipop-sec mr-3 pr-3 mt-2">
        <img src="../../assets/icons/debutant.png" width="10" className="mr-3" />
        {n.name}
      </button>
    })
  }
  return (
    <div className="SignupForm">
      <fieldset style={props.isLoading || props.formations.length < 1 ? {
        opacity: '0.3'
      } : {}} disabled={props.formations.length < 1}>
        <div >
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
        <div className="mt-2">
          <NiveauxBtns />
        </div>

        <form className="mt-3" name="signup" id="signup" onSubmit={formSubmit}>
          <input type="text" name="nom" placeholder="Nom *" className="lollipop-input mb-4" />
          {(formError && formError.nomError) && <p className="error">Verifiez votre nom.</p>}
          <input type="text" name="prenom" placeholder="Prénom *" className="lollipop-input mb-4" />
          {(formError && formError.prenomError) && <p className="error">Verifiez votre prénom.</p>}
          <input type="email" name="email" placeholder="Adresse email *" className="lollipop-input mb-4" />
          {(formError && formError.emailError) && <p className="error">Verifiez votre nom.</p>}

          <div className="mt-3">
            <h6>Décrivez en quelques phrase votre motivation pour la formation sélectionnée</h6>
            <textarea className="idea-textarea" name="idee-projet" style={{ boxSizing: 'border-box', width: '100%' }}></textarea>
          </div>

          <div className="mt-3">
            <input type="text" placeholder="Adresse *" name="adresse" className="lollipop-input mb-4" />
            {(formError && formError.addressError) && <p className="error">Verifiez votre adresse.</p>}
            <input type="text" placeholder="Ville *" name="ville" className="lollipop-input mb-4" />
            {(formError && formError.villeError) && <p className="error">Verifiez votre ville.</p>}
            <input type="number" placeholder="Votre âge *" name="age" className="lollipop-input mb-4" />
            {(formError && formError.ageError) && <p className="error">Verifiez votre age.</p>}
            <input type="phone" placeholder="Numéro de téléphone *" name="telephone" className="lollipop-input mb-4" />
            {(formError && formError.phoneError) && <p className="error">Verifiez votre téléphone.</p>}
            <input type="phone" placeholder="Votre profession *" name="profession" className="lollipop-input mb-4" />
            {(formError && formError.professionError) && <p className="error">Verifiez votre profession.</p>}
          </div>

          <div className="ml-auto" style={{ maxWidth: '70px' }}>
            <button className="btn btn-lollipop-prim" type="submit">Valider</button>
          </div>
        </form>

      </fieldset>
    </div>
  )
}

export default SignupForm
