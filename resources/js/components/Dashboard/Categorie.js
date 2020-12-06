import React, { useState, useEffect, useRef } from 'react'
import {
  Row,
  Col,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory, {
  textFilter,
  selectFilter
} from "react-bootstrap-table2-filter"

import categorieService from '../../services/categorie.service'

const Categorie = () => {

  const [loading, setLoading] = useState(true)
  const [catForm, showCatForm] = useState(false)
  const [selected, setSelected] = useState(-1)
  const [categories, setCategories] = useState([])
  const [isOpen, setOpen] = useState(false)
  const toggle = () => setOpen(!isOpen)


  useEffect(() => {
    categorieService.getAll().then(res => {
      setLoading(false)
      setCategories(res)
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
      dataField: 'name',
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

  const CategorieModal = () => {

    const deleteCategorie = () => {
      setLoading(true)
      categorieService.remove(selected).then(res => {
        let tmp = categories
        const foundIndex = categories.findIndex(c => c.id == selected)
        if (foundIndex !== -1) {
          tmp.splice(foundIndex, 1)
        }
        setCategories(tmp)
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
        <p>Vous etes sur vous voulez supprimer cette formation?</p>
        <p style={{
          color: 'red'
        }}>
          NB: La suppression du categorie supprime toute formation relative.
      </p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Annuler</Button>{' '}
        <Button color="primary" onClick={() => deleteCategorie()}>Confirmer</Button>
      </ModalFooter>
    </Modal>
  }

  const CategorieForm = () => {

    const [error, setError] = useState(null)
    let nameRef = useRef(null)

    const submit = () => {
      setError(null)
      if (!nameRef.value) {
        setError('Champs requis')
        return
      }
      setLoading(true)
      const newcategory = { name: nameRef.value }
      categorieService.save(newcategory).then(res => {
        newcategory.id = res.new
        setCategories([...categories, newcategory])
      }).catch(err => console.log(err))
        .finally(() => {
          setLoading(false)
          showCatForm(false)
        })
    }
    return <div style={{
      maxWidth: '500px',
      marginBottom: '50px'
    }}>
      <label>Nom</label>
      <input text="text" className="form-control" ref={(name) => nameRef = name} />
      {error && <p style={{ color: 'red' }}>Ce champs est requis!</p>}
      <div className="btn-group my-2">
        <button className="btn btn-default" onClick={() => showCatForm(false)}>
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
      <h4>Liste des categories</h4>
      <button className="btn btn-danger" onClick={() => showCatForm(true)}>
        <i className="fa fa-plus pr-2"></i>
        Nouvelle categorie
      </button>
    </div>
    {catForm && <CategorieForm />}
    <BootstrapTable
      keyField="id"
      data={categories}
      columns={columns}
      defaultSortDirection="asc"
      pagination={paginationFactory()}
      filter={filterFactory()} />
    <CategorieModal />
  </div>
}

export default Categorie