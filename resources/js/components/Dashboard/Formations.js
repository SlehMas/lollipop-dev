import React, { useState, useEffect } from 'react'
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import { Link } from 'react-router-dom'
import formationService from '../../services/formation.service'

import FormationModal from './FormationModal'

import filterFactory, {
  textFilter,
  selectFilter
} from "react-bootstrap-table2-filter"

const Formations = () => {
  const [modal, setModal] = useState(false);
  const [modalAction, setModalAction] = useState('')
  const [selected, setSelected] = useState(-1)
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggle = () => setModal(!modal);


  useEffect(() => {
    setLoading(true)
    formationService.getAll().then(
      res => {
        setFormations(res)
      }
    ).catch(err => console.log(err))
     .finally(() => setLoading(false))
  }, [])


  const onDelete = () => {
    let tmp = formations
    const deleteIndex = tmp.findIndex(f => f.id === selected.id)
    if (deleteIndex !== -1) {
      tmp.splice(deleteIndex, 1)
      setFormations([...tmp])
    }

  }

  const actionButtons = (cell, row, rowIndex, formatExtraData) => {

    const idFormation = row.id

    return (
      <div className="btn-group">
        <button className="btn btn-primary" onClick={() => {
          setSelected(row)
          setModalAction('details')
          setModal(true)
        }}>
          <i className="fa fa-eye"></i>
        </button>
        <Link to={`formations/${idFormation}`} className="btn btn-info">
          <i className="fa fa-pen"></i>
        </Link>
        <button className="btn btn-danger" onClick={() => {
          setSelected(row)
          setModalAction('delete')
          setModal(true)
        }}>
          <i className="fa fa-trash"></i>
        </button>
      </div>
    )
  }
  const columns = [
    {
      dataField: 'id',
      text: '#',
      sort: true
    },
    {
      dataField: 'nom',
      text: 'Nom formation',
      sort: true
    },
    {
      dataField: 'date_debut',
      text: 'Date debut',
      sort: true
    },
    {
      dataField: 'date_fin',
      text: 'Date Fin',
      sort: true
    },
    {
      dataField: 'categorie.name',
      text: 'Categories',
      sort: true
    },
    {
      dataField: 'places',
      text: 'Places',
      sort: false
    },
    {
      dataField: 'niveau.name',
      text: 'Niveau',
      sort: false
    },
    {
      dataField: 'lieu',
      text: 'Lieu',
      formatter: (val) => val.charAt(0).toUpperCase() + val.slice(1),
      sort: false
    },
    {
      dataField: "",
      text: "Action",
      formatter: actionButtons,
    }
  ]

  return (<div>
    {loading && <div className="loading style-2"><div className="loading-wheel"></div></div>}
    <div className="header mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h4>Liste des formations</h4>
      <Link to="formations/new" className="btn btn-danger">
        <i className="fa fa-plus pr-2"></i>
        Nouvelle formation
      </Link>
    </div>
    <BootstrapTable
      keyField="id"
      data={formations}
      columns={columns}
      defaultSortDirection="asc"
      pagination={paginationFactory()}
      filter={filterFactory()}
    />
    <FormationModal modal={modal}
      toggle={toggle}
      action={modalAction}
      onDelete={onDelete}
      selected={selected} />
  </div>)
}

export default Formations