import React, { useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import moment from 'moment'
import classnames from 'classnames'

import SignupFormGeneric from './SignupFormGeneric'
import DateSelect from './DateSelect'


import formationService from '../services/formation.service'
import categorieService from '../services/categorie.service'
import lieuService from '../services/lieu.service'

const Signup = (props) => {

  const [currentFormation, setCurrentFormation] = useState([])
  const [categories, setCategories] = useState([])
  const [lieux, setLieux] = useState([])
  const [currentLieu, setCurrentLieu] = useState(null)
  const [currentCategories, setCurrentCategories] = useState([])
  const [formations, setFormations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeDate, setActiveDate] = useState(new Date())
  const [done, setDone] = useState(false)


  useEffect(() => {
    categorieService.getAll().then(res => setCategories(res))
    lieuService.getAll().then(res => setLieux(res))
  }, [])
  useEffect(() => {
    document.querySelector('.niveaux_section') && document.querySelector('.niveaux_section').remove()
    if (currentCategories.length && currentLieu) {
      setIsLoading(true)

      formationService.getAll(moment(activeDate).format('YYYY-MM-DD'), currentLieu, currentCategories).then(
        res => {

          let result = res
          setIsLoading(false)
          result.map(f => {
            f.niveau.name = f.niveau.name.toLowerCase()
            f.dates_formation = f.dates_formation.map(fd => fd.date)
            return f
          })
          setFormations(result)

          let niveauxSection = document.createElement('div')
          niveauxSection.classList.add('niveaux_section')
          niveauxSection.style.padding = '10px 5px'
          niveauxSection.style.justifyContent = 'space-between'

          let niveaux = result.map(f => f.niveau)
          niveaux = niveaux.filter((t, index) => niveaux.findIndex(n => n.name === t.name) === index)

          niveaux.map(n => {
            let niveauDiv = document.createElement('div')
            niveauDiv.style.color = n.color
            niveauDiv.style.textTransform = 'capitalize'
            niveauDiv.innerText = n.name
            niveauxSection.append(niveauDiv)
          })
          result.length && document.querySelector('.react-calendar__viewContainer').append(niveauxSection)
        }
      ).catch(err => setIsLoading(false))
    }
  }, [activeDate, currentCategories, currentLieu])

  const hasCategorie = (categorie) => currentCategories.includes(categorie)
  const toggleCategorie = (categorie) => {
    if (!hasCategorie(categorie)) setCurrentCategories([...currentCategories, categorie])
    else {
      if (currentCategories.length < 2)
        return
      let newCurrCatArray = currentCategories
      newCurrCatArray.splice(
        newCurrCatArray.findIndex(cc => cc === categorie),
        1
      )
      setCurrentCategories(newCurrCatArray.length ? Array.from(newCurrCatArray) : Array.from([]))
    }
  }
  return (
    <div className="Signup container mt-4">

      {

        !done ? <Row>

          <Col xs={12} md={5} >
            <div className="calendar-header">
              <h3 style={{ paddingRight: '30px', fontWeight: '800', textDecoration: 'underline' }}>Sélectionnez votre/vos formation(s)</h3>
            </div>
            <div className="filter-btns mt-2">
              <h5><i className="fa fa-list-alt mr-2 mt-3"></i>Sélectionnez vos catégories :</h5>
              {
                categories.map((c, index) =>
                  <React.Fragment>
                    {(index % 3 && index > 0) == 0 && <div className="mt-3 d-none d-sm-block"></div>}
                    <button style={{ textTransform: 'capitalize' }}
                      key={c.id}
                      className={classnames(
                        "btn btn-lollipop-sec mr-3 pr-3 mt-2",
                        hasCategorie(c.id) ? 'filter-on' : ''
                      )}
                      onClick={() => {
                        toggleCategorie(c.id)
                      }}>
                      {c.name}  <i className={classnames(
                        "pl-4",
                        hasCategorie(c.id) ? 'fa fa-times' : 'fa fa-plus'
                      )}></i>
                    </button>
                  </React.Fragment>
                )
              }
              <h5><i className="fa fa-map-pin mr-2 mt-3"></i>Choisissez	le	lieu	de	la	formation :</h5>
              {lieux.map(l => <button style={{ textTransform: 'capitalize' }}
                className={classnames(
                  "btn btn-lollipop-sec mr-3 pr-3",
                  currentLieu == l.nom ? 'filter-on' : ''
                )}
                onClick={() => {
                  setCurrentLieu(l.nom)
                }}>
                {l.nom} <i className={classnames(
                  "pl-4",
                  currentLieu == l.nom ? 'fa fa-times' : 'fa fa-plus'
                )}></i>
              </button>)}


            </div>
            <DateSelect isLoading={isLoading}
              formations={formations}
              currentFormation={currentFormation}
              currentCategories={currentCategories}
              currentLieu={currentLieu}
              activeDate={activeDate}
              setActiveDate={setActiveDate}
              setCurrentFormation={setCurrentFormation} />


            <a href='/programmes' className="btn btn-lollipop-prim" style={{ marginLeft: "calc(100% - 220px)" }}>Les détails des formations</a>
          </Col>
          <Col xs={12} md={7} style={{ borderLeft: '1px solid #6300ee' }}>
            <SignupFormGeneric formations={formations.map(f => f.niveau)} currentFormation={currentFormation} isLoading={isLoading} setDone={setDone} />
          </Col>
        </Row> : <div style={{
          marginTop: '150px',
          fontSize: '1.5em',
          textAlign: 'center'
        }}>
            <p>Merci d’avoir remplie le formulaire, nous vous contacterons pour plus d'informations,
            pour terminer la procédure de l'enregistrement et pour confirmer votre présence.
            A bientôt
              <br />
              <br />
              Equipe Lollipop Training.</p>
            <a href="/" className="btn btn-lollipop-prim px-3 py-1">Vers l'accueil</a>
          </div>
      }
    </div>
  )
}

export default Signup
