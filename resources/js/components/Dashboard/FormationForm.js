import React, { useState, useEffect, useRef } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker';
import { Link, Redirect } from 'react-router-dom'
import ReactQuill from "react-quill";

import moment from 'moment'
import {
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from 'reactstrap'

import formationService from '../../services/formation.service'
import niveauService from '../../services/niveau.service'
import lieuService from '../../services/lieu.service'
import categorieService from '../../services/categorie.service'

import "react-quill/dist/quill.snow.css";
import 'react-day-picker/lib/style.css';

const FormationForm = (props) => {

  let imageRef = useRef(null)
  const [datesFormation, setDatesFormation] = useState([])
  const [description, setDescription] = useState('')
  const [niveaux, setNiveaux] = useState([])
  const [showInPage, setShowInPage] = useState(true)
  const [lieux, setLieux] = useState([])
  const [image, setImage] = useState(null)
  const [categories, setCategories] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toHome, setToHome] = useState(false)
  const [formation, setFormation] = useState({})

  useEffect(() => {
    setLoading(true)

    niveauService.getAll().then(res => {
      setNiveaux(res)
    })
    categorieService.getAll().then(res => {
      setCategories(res)
    })
    lieuService.getAll().then(res => {
      setLieux(res)
    })
  }, [])

  useEffect(() => {
    if (props.match.params.id) {

      formationService.getById(props.match.params.id).then(res => {
        setFormation(res)
        setStartDate(new Date(res.date_debut))
        setShowInPage(parseInt(res.show_in_page) == 1)
        setDescription(res.description || '')
        if (res.image) {
          setImage({
            file_name: res.image
          })
          // imageRef.current.src = `../public/assets/formations/${res.image}`;
        }
        let lieuSelect = document.getElementById('lieu')
        const lieuIndex = Array.from(lieuSelect.options).findIndex(l => l.value == res.lieu.toLowerCase())
        if (lieuIndex !== -1)
          lieuSelect.options[lieuIndex].selected = true

        let categorieSelect = document.getElementById('categorie')
        const categorieIndex = Array.from(categorieSelect.options).findIndex(l => l.value == res.categorie.id)
        if (categorieIndex !== -1)
          categorieSelect.options[categorieIndex].selected = true

        let niveauSelect = document.getElementById('niveau')
        const niveauIndex = Array.from(niveauSelect.options).findIndex(l => l.value == res.niveau.id)
        if (niveauIndex !== -1)
          niveauSelect.options[niveauIndex].selected = true

        setDatesFormation(res.dates_formation.map(df => new Date(df.date)))
        setLoading(false)
      }).catch(err => {
        // setToHome(true)
      })
        .finally(() => setLoading(false))

    } else {
      setStartDate(new Date())
      setLoading(false)
    }
  }, [])

  const handleDayClick = (day, { selected }) => {
    let selectedDays = Array.from(datesFormation)
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1)
    } else {
      selectedDays.push(day)
    }
    setDatesFormation(selectedDays);
  }

  const readFile = (file) => {
    var reader = new FileReader();

    reader.onload = function (e) {
      imageRef.current.src = e.target.result
    }

    reader.readAsDataURL(file);
  }
  const handleImage = (e) => {
    const file = e.target.files[0]

    readFile(file)
    const formData = new FormData();
    formData.append(
      "image",
      file,
      "test"
    );
    formationService.uploadLogo(formData)
      .then(res => {
        setImage(res.data)
      })
      .catch(err => console.log(err))
  }


  const handleFormSubmit = (e) => {
    const datesFormatted = datesFormation.map(d => moment(new Date(d)).format('YYYY-MM-DD')).sort()
    setLoading(true)
    e.preventDefault()
    const data = new FormData(e.target);
    const newFormation = {
      nom: data.get('nom'),
      lieu: data.get('lieu'),
      places: parseInt(data.get('places')),
      date_debut: datesFormatted[0],
      date_fin: datesFormatted[datesFormatted.length - 1],
      id_categorie: data.get('categorie'),
      id_niveau: data.get('niveau'),
      description,
      show_in_page: showInPage,
      image: image? image['file_name'] : null,
      dates_formation: datesFormatted
    }
    if (datesFormation.length < 1) {
      alert('Selectionnez dates du formation')
      setLoading(false)
      return
    }
    if (props.match.params.id) {
      newFormation.id = props.match.params.id
      formationService.update(newFormation).then(
        res => {
          setToHome(true)
        }, err => {

        }
      )
    } else {
      formationService.save(newFormation).then(
        res => {
          setToHome(true)
        }
      )
    }
  }
  if (toHome)
    return <Redirect to="/dashboard/formations" />
  return <React.Fragment>
    {loading && <div className="loading style-2"><div className="loading-wheel"></div></div>}
    <form name="newFormation" id="newFormation" onSubmit={handleFormSubmit}>

      <legend>{props.match.params.id ? 'Edition formation' : 'Nouvelle'}</legend>
      <Row>
        <Col xs={7}>
          <h5>Informations</h5>

          <FormGroup>
            <Label htmlFor="nom">Nom</Label>
            <Input type="text" name="nom" required defaultValue={formation.nom || ''} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="lieu">Lieu</Label>
            <select className="form-control" name="lieu" id="lieu" style={{ textTransform: 'capitalize' }} required>
              {lieux.map(l => <option value={l.nom.toLowerCase()} id={l.id}>{l.nom}</option>)}
            </select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="places">Places</Label>
            <Input type="number" name="places" required defaultValue={formation.places || ''} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="categorie">Categorie</Label>
            <select className="form-control" name="categorie" id="categorie" required>
              {categories.map(c => <option value={c.id}>
                {c.name}
              </option>)}

            </select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="niveau">Niveau</Label>
            <select className="form-control" name="niveau" id="niveau" required>
              {niveaux.map(n => <option value={n.id}>{n.name}</option>)}
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <ReactQuill
              value={description}
              onChange={(content) => setDescription(content)}
              theme="snow"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="image">Image</Label>
            <input type="file" name="image" id="" className="form-control" onChange={handleImage} accept="image/*" />

          </FormGroup>

          <FormGroup>
            <Label htmlFor="show">Afficher dans la page formations?</Label>
            <input type="checkbox" name="show" id="" className="ml-5" checked={showInPage} onChange={() => setShowInPage(!showInPage)} />
          </FormGroup>
        </Col>
        <Col xs={5}>

          <FormGroup>
            <h5>Dates de formation</h5>
            {startDate && <DayPicker
              locale='fr'
              initialMonth={startDate}
              selectedDays={datesFormation}
              onDayClick={handleDayClick}
            />}
          </FormGroup>
          <FormGroup>
            <h5>Aperçu d'image</h5>
            {image ? <img src={`../../../public/assets/formations/${image['file_name']}`} width="300" ref={imageRef} /> : <p>Aucune image</p>}
          </FormGroup>
        </Col>
        <div className="btn-group ml-auto mr-5" style={{ maxWidth: '500px' }}>
          <Link className="btn btn-default" to="/dashboard/formations">
            Annuler
        </Link>
          <input type="submit" value="Sauvgarder" className="btn btn-primary" required />
        </div>
      </Row>
    </form>
  </React.Fragment>
}

export default FormationForm
