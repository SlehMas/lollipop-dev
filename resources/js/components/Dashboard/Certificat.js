import React, { useState, useEffect, useRef } from 'react'
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import { Link } from 'react-router-dom'
import certificationService from '../../services/certifications.service'
import moment from 'moment'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import filterFactory, {
  textFilter,
  selectFilter
} from "react-bootstrap-table2-filter"

const Certificat = () => {
  const [modal, setModal] = useState(false);
  const [certForm, showCertForm] = useState(false)
  const [selected, setSelected] = useState(-1)
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggle = () => setModal(!modal);


  useEffect(() => {
    setLoading(true)
    certificationService.getAll().then(
      res => {
        setCertifications(res)
      }
    ).catch(err => console.log(err))
     .finally(() => setLoading(false))
  }, [])


  const onDelete = () => {
    let tmp = certifications
    const deleteIndex = tmp.findIndex(f => f.id === selected.id)
    if (deleteIndex !== -1) {
      tmp.splice(deleteIndex, 1)
      setcertifications([...tmp])
    }

  }

  const actionButtons = (cell, row, rowIndex, formatExtraData) => {

    const idCertification = row.id

    return (
      <div className="btn-group">
        <Link to={`/cert/${row.id_cert}`} target="_blank" className="btn btn-primary">
          <i className="fa fa-eye"></i>
        </Link>
        <button className="btn btn-danger" onClick={() => {
          setSelected(row.id)
          toggle()
        }}>
          <i className="fa fa-trash"></i>
        </button>
      </div>
    )
  }
  const columns = [
    {
      dataField: 'id_cert',
      text: '#',
      sort: true
    },
    {
      dataField: 'nom',
      text: 'Nom',
      sort: true
    },
    {
      dataField: 'certificat',
      text: 'Certificat',
      sort: true
    },
    {
      dataField: 'niveau',
      text: 'Niveau',
      sort: false
    },
    {
      dataField: 'date_obtention',
      text: 'Date obtention',
      sort: false
    },
    {
      dataField: "",
      text: "Action",
      formatter: actionButtons,
    }
  ]

  const CertificationModal = () => {

    const deleteCertification = () => {
      toggle()
      console.log(selected)
      certificationService.remove(selected).then(res => {
        setLoading(true)
        let tmp = certifications
        const foundIndex = certifications.findIndex(c => c.id == selected)
        if (foundIndex !== -1) {
          tmp.splice(foundIndex, 1)
        }
        setCertifications(tmp)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false)
      })
    }

    return <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirmer</ModalHeader>
      <ModalBody>
      <p>Vous etes sur vous voulez supprimer ce certificat? {selected}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Annuler</Button>{' '}
        <Button color="primary" onClick={() => deleteCertification()}>Confirmer</Button>
      </ModalFooter>
    </Modal>
  }

  const CertificationForm = () => {

    const [error, setError] = useState(null)
    let nameRef = useRef(null)
    let certRef = useRef(null)
    let niveauRef = useRef(null)
    let dateRef = useRef(null)

    const submit = () => {
      setError(null)
      let tmpErr = {}
      if (!nameRef.value) {
        tmpErr.nameErr = true
      }
      if (!certRef.value) {
        tmpErr.certErr = true
      }
      if (!niveauRef.value) {
        tmpErr.niveauErr = true
      }
      if (!dateRef.value) {
        tmpErr.dateErr = true
      }

      if (Object.keys(tmpErr).length > 0) {
        setError(tmpErr)
        return
      }
      setLoading(true)
      const newcertificat = { 
        nom: nameRef.value, 
        certificat: certRef.value,
        niveau: niveauRef.value,
        date_obtention: moment(new Date(dateRef.value)).format('YYYY-MM-DD'),
        id_cert: Math.random().toString(32).slice(3, 9)
      }
      certificationService.save(newcertificat).then(res => {
        newcertificat.id = res.new
        setCertifications([...certifications, newcertificat])
      }).catch(err => console.log(err))
        .finally(() => {
          setLoading(false)
          showCertForm(false)
        })
    }
    return <div style={{
      maxWidth: '500px',
      marginBottom: '50px'
    }}>
      <label>Nom</label>
      <input type="text" className="form-control" ref={(name) => nameRef = name} />
      {error && error.nameErr && <p style={{ color: 'red' }}>Ce champs est requis!</p>}

      <label>Certificat</label>
      <input type="text" className="form-control" ref={(c) => certRef = c} />
      {error && error.certErr && <p style={{ color: 'red' }}>Ce champs est requis!</p>}

      <label>Niveau</label>
      <input type="text" className="form-control" ref={(n) => niveauRef = n} />
      {error && error.niveauErr && <p style={{ color: 'red' }}>Ce champs est requis!</p>}

      <label>Date d'obtention</label>
      <input type="date" className="form-control" ref={(d) => dateRef = d} />
      {error && error.dateErr && <p style={{ color: 'red' }}>Ce champs est requis!</p>}
      <div className="btn-group my-2">
        <button className="btn btn-default" onClick={() => showCertForm(false)}>
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

  return (<div>
    {loading && <div className="loading style-2"><div className="loading-wheel"></div></div>}
    <div className="header mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h4>Liste des certifications</h4>
      <button className="btn btn-danger" onClick={() => {
        showCertForm(true)
      }}>
        <i className="fa fa-plus pr-2"></i>
        Nouvelle certification
      </button>
    </div>
    {certForm && <CertificationForm />}
    <BootstrapTable
      keyField="id"
      data={certifications}
      columns={columns}
      defaultSortDirection="asc"
      pagination={paginationFactory()}
      filter={filterFactory()}
    />
    <CertificationModal/>
  </div>)
}

export default Certificat