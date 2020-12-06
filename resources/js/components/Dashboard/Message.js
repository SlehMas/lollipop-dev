import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BootstrapTable from "react-bootstrap-table-next"
import moment from 'moment'
import classnames from 'classnames'
import paginationFactory from "react-bootstrap-table2-paginator"

import messageService from '../../services/messages.service'


import filterFactory from "react-bootstrap-table2-filter"

const Message = () => {

  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])

  const columns = [
    {
      dataField: 'id',
      text: '#',
      sort: true
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: true
    },
    {
      dataField: 'objet',
      text: 'Objet',
      sort: true,
      formatter: (val) => val || <i>Aucun objet</i>
    },
    {
      dataField: 'created_at',
      text: 'Recu',
      sort: true,
      formatter: (val) => {
        const dateVal = new Date(val)
        if (moment().diff(new Date(val), 'days') < 1) {
          if (moment().diff(new Date(val), 'hours') < 1) {
            if (moment().diff(new Date(val), 'minutes') < 1) {
              return 'Il y a ' + moment().diff(new Date(val), 'seconds') + ' secondes.'
            }
            return 'Il y a ' + moment().diff(new Date(val), 'minutes') + ' minutes'
          }
          return 'Il y a ' + moment().diff(new Date(val), 'hours') + ' heures'
        }
        return 'Il y a' + moment().diff(new Date(val), 'days') + ' jours'
      }
    },
    {
      dataField: '',
      text: 'Action',
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return <Link to={`/dashboard/messages/${row.id}`} className="btn btn-lollipop-prim">
          <i className="fa fa-book-reader"></i>
        </Link>
      }
    }
  ]

  useEffect(() => {

    setLoading(true)
    messageService.getAll().then(data => {
      setMessages(data.sort((a, b) => (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ))
      )
      setLoading(false)
    })
  }, [])

  return (<div className="Message">
    {loading && <div className="loading style-2"><div className="loading-wheel"></div></div>}
    <div className="header mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h4>Messages recus</h4>
    </div>
    <BootstrapTable
      keyField="id"
      rowClasses={(row, rowIndex) => classnames(!row.is_read ? 'unread' : '')}
      data={messages}
      columns={columns}
      defaultSortDirection="asc"
      pagination={paginationFactory()}
      filter={filterFactory()}
    />
  </div>)
}

export default Message

