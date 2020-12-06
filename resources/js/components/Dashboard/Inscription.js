import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory, {
  textFilter,
  selectFilter
} from "react-bootstrap-table2-filter"

import inscriptionService from '../../services/inscription.service'
import { Link } from 'react-router-dom'


const Inscription = (props) => {

  const [inscriptions, setInscriptions] = useState([])
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const toggle = () => setOpen(!isOpen)

  useEffect(() => {
    setLoading(true)
    inscriptionService.getAll().then(res => setInscriptions(res))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  const actionButtons = (cell, row, rowIndex, formatExtraData) => {

    const idInscription = row.id

    return <div className="btn-group">
      <button className="btn btn-default" onClick={() => {
        setSelected(row)
        toggle()
      }}>
        <i className="fa fa-eye"></i>
      </button>
      {row.etat === 'en_attente' &&
        <React.Fragment>
          <button className="btn btn-primary" onClick={() => {
            setLoading(true)
            inscriptionService.accept(idInscription)
              .then(res => {
                row.etat = 'valide'
              })
              .catch(err => console.log(err))
              .finally(() => setLoading(false))
          }}>
            <i className="fa fa-thumbs-up"></i>
          </button>

          <button className="btn btn-danger" onClick={() => {
            setLoading(true)
            inscriptionService.refuse(idInscription)
              .then(res => {
                row.etat = 'refus'
              })
              .catch(err => console.log(err))
              .finally(() => setLoading(false))
          }}>
            <i className="fa fa-times"></i>
          </button>
        </React.Fragment>}
    </div>
  }

  const InscriptionModal = () => {

    return <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Details d'inscription</ModalHeader>
      <ModalBody>

        {isOpen && <div>
          <strong>Nom et prenom</strong>
          <p>{selected.nom} {selected.prenom}</p>

          <strong>Email</strong>
          <p>{selected.email}</p>

          <strong>Telephone</strong>
          <p>{selected.telephone}</p>

          <strong>Adresse</strong>
          <p>{selected.adresse}</p>

          <strong>Ville</strong>
          <p>{selected.ville}</p>

          <strong>Age</strong>
          <p>{selected.age}</p>

          <strong>Profession</strong>
          <p>{selected.profession}</p>

          <strong>Décrivez en quelques phrase votre motivation pour la formation sélectionnée </strong>
          <p>{selected.motivation}</p>

        </div>}

      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Fermer</Button>
      </ModalFooter>
    </Modal>
  }

  const columns = [
    {
      dataField: 'id',
      text: '#',
      sort: true
    },
    {
      dataField: '',
      text: 'Nom',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return row.prenom + ' ' + row.nom
      }
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: true
    },
    {
      dataField: 'adresse',
      text: 'Adresse',
      sort: true
    },
    {
      dataField: 'formation.nom',
      text: 'Formation',
      sort: true
    },
    {
      dataField: 'niveau.name',
      text: 'Niveau',
      sort: true
    },
    {
      dataField: 'telephone',
      text: 'Telephone',
      sort: true
    },
    {
      dataField: 'etat',
      text: 'Etat',
      sort: true,
      formatter: (val) => {
        let formatted = ''
        let classname = 'badge'
        switch (val) {
          case 'en_attente':
            formatted = 'En attente'
            classname += ' badge-warning'
            break
          case 'valide':
            formatted = 'Validée'
            classname += ' badge-success'
            break
          case 'refus':
            formatted = 'Refusée'
            classname += ' badge-danger'
            break
          default:
            break
        }
        return <span className={classname}>
          {formatted}
        </span>
      }
    },
    {
      dataField: "",
      text: "Action",
      formatter: actionButtons,
    }
  ]


  return <div>
    {loading && <div className="loading style-2"><div className="loading-wheel"></div></div>}
    <div className="header mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h4>Liste des inscription</h4>
    </div>
    <BootstrapTable
      keyField="id"
      data={inscriptions}
      columns={columns}
      defaultSortDirection="asc"
      pagination={paginationFactory()}
      filter={filterFactory()} />
    <InscriptionModal />
  </div>
}

export default Inscription