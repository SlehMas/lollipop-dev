import React, { useEffect, useState } from 'react'
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

import { Link } from 'react-router-dom'
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory from "react-bootstrap-table2-filter"

import blogService from '../../services/blog.service'

const Blog = () => {
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(-1)
  const [posts, setPosts] = useState([])
  const [isOpen, setOpen] = useState(false)
  const toggle = () => setOpen(!isOpen)


  useEffect(() => {
    blogService.getAll().then(res => {
      setLoading(false)
      setPosts(res)
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
      dataField: 'title',
      text: 'Titre',
      sort: true
    },
    {
      dataField: 'views',
      text: 'Nombre des vus',
      sort: true
    },
    {
      dataField: 'created_at',
      text: 'Date de creation',
      sort: true,
      formatter: (val) =>  {
        return new Date(val).toLocaleDateString('fr')
      }
    },
    {
      dataField: '',
      text: 'Action',
      formatter: (cell, row) => {

        return <div className="btn-group">
          <Link to={`/dashboard/blog/${row.id}`} className="btn btn-primary">
            <i className="fa fa-pen"></i>
          </Link>
          <a href={`/blog/${row.permalink}`} target="_blank" className="btn btn-default">
            <i className="fa fa-eye"></i>
          </a>
          <button className="btn btn-danger" onClick={() => {
            setSelected(row.id)
            toggle()
          }}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      }
    }
  ]

  const BlogModal = () => {

    const deleteBlog = () => {
      toggle()
      setLoading(true)
      blogService.remove(selected).then(res => {
        let tmp = posts
        const foundIndex = posts.findIndex(p => p.id == selected)
        if (foundIndex !== -1) {
          tmp.splice(foundIndex, 1)
        }
        setCategories(tmp)
      })
        .catch(err => console.log(err))
        .finally(() => {
          setLoading(false)
        })
    }

    return <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirmer</ModalHeader>
      <ModalBody>
        <p>Vous etes sur vous voulez supprimer ce post?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Annuler</Button>{' '}
        <Button color="primary" onClick={() => deleteBlog()}>Confirmer</Button>
      </ModalFooter>
    </Modal>
  }

  return <div>
    {loading && <div className="loading style-2"><div className="loading-wheel"></div></div>}
    <div className="header mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h4>Liste des posts</h4>
      <Link to='/dashboard/blog/new' className="btn btn-danger" >
        <i className="fa fa-plus pr-2"></i>
        Nouveeau post
      </Link>
    </div>
    <BootstrapTable
      keyField="id"
      data={posts}
      columns={columns}
      defaultSortDirection="asc"
      pagination={paginationFactory()}
      filter={filterFactory()} />
    <BlogModal />
  </div>
}

export default Blog