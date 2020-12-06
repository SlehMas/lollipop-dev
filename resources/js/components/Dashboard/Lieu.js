import React, { useState, useEffect, useRef } from 'react'
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory from "react-bootstrap-table2-filter"

import lieuService from '../../services/lieu.service'

const Lieu = () => {

  const [loading, setLoading] = useState(true)
  const [nivForm, showNivForm] = useState(false)
  const [selected, setSelected] = useState(-1)
  const [lieux, setLieux] = useState([])
  const [isOpen, setOpen] = useState(false)
  const toggle = () => setOpen(!isOpen)


  useEffect(() => {
    lieuService.getAll().then(res => {
      setLoading(false)
      setLieux(res)
    })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  const columns = [
    {
      dataField: 'id',
      text: '#',
      sort: true
    },
    {
      dataField: 'nom',
      text: 'Nom',
      sort: true
    },
    {
      dataField: '',
      text: 'Action',
      formatter: (cell, row) => {
        
        return <button className="btn btn-primary" onClick={() => {
          setSelected(row.id)
          toggle()
        }}>
          <i className="fa fa-trash"></i>
        </button>
      }
    }
  ]

  const LieuModal = () => {

    const deleteLieu = () => {
      setLoading(true)
      lieuService.remove(selected).then(res => {
        let tmp = lieux
        const foundIndex = lieux.findIndex(c => c.id == selected)
        if (foundIndex !== -1) {
          tmp.splice(foundIndex, 1)
        }
        setLieux(tmp)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false)
        setOpen(false)
      })
    }

    return <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirmer</ModalHeader>
      <ModalBody>
        <p>Vous etes sur vous voulez supprimer ce lieu?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Annuler</Button>{' '}
        <Button color="primary" onClick={() => deleteLieu()}>Confirmer</Button>
      </ModalFooter>
    </Modal>
  }

  const LieuForm = () => {

    const [error, setError] = useState(null)
    let nameRef = useRef(null)

    const submit = () => {
      let tmpErr = {}
      if (!nameRef.value) {
        tmpErr.name = 'Champs requis'
      }
      setError(tmpErr)
      
      if (Object.keys(tmpErr).length) {
        return
      }
      setLoading(true)
      const newlieu = { nom: nameRef.value }
      lieuService.save(newlieu).then(res => {
        newlieu.id = res.new
        setLieux([...lieux, newlieu])
      }).catch(err => console.log(err))
        .finally(() => {
          setLoading(false)
          showNivForm(false)
        })
    }
    return <div style={{
      maxWidth: '500px',
      marginBottom: '50px'
    }}>
      <label>Nom</label>
      <input text="text" className="form-control" ref={(name) => nameRef = name} />
      {error && error.name && <p style={{ color: 'red' }}>Ce champs est requis!</p>}
      <div className="btn-group my-2">
        <button className="btn btn-default" onClick={() => showNivForm(false)}>
          Annuler
        </button>
        <button className="btn btn-primary" onClick={() => {
          submit()
        }}>
          Sauvgarder
        </button>
      </div>
    </div>
  }
  return <div>
    {loading && <div className="loading style-2"><div className="loading-wheel"></div></div>}
    <div className="header mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h4>Liste des lieux</h4>
      <button className="btn btn-danger" onClick={() => showNivForm(true)}>
        <i className="fa fa-plus pr-2"></i>
        Nouveau lieu
      </button>
    </div>
    {nivForm && <LieuForm />}
    <BootstrapTable
      keyField="id"
      data={lieux}
      columns={columns}
      defaultSortDirection="asc"
      pagination={paginationFactory()}
      filter={filterFactory()} />
    <LieuModal />
  </div>
}

export default Lieu