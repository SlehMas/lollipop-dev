import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'

import messageService from '../../services/messages.service'

const SingleMessage = (props) => {

  const [message, setMessage] = useState({})
  const [loading, setLoading] = useState(false)
  const [toHome, setToHome] = useState(false)

  useEffect(() => {
    setLoading(true)


    messageService.getById(props.match.params.id).then(async data => {
      setMessage(data)
      if (!data.is_read) {
        await messageService.read(props.match.params.id)
      }
      setLoading(false)
    }).catch(err => {
      setLoading(false)
      setToHome(true)
    })


  }, [])
  return toHome ? <Redirect to="/dashboard/messages" /> :
    loading ? <div className="loading style-2"><div className="loading-wheel"></div></div> : <div>
      <div className="message-header" style={{display: 'flex'}}>
        <Link to="/dashboard/messages"><i className="fa fa-arrow-left mt-2 mr-5"></i></Link>
        <div className="email_header">
          <h3>{message.email || ''}</h3>
          <p>{message.objet || <i>Aucun objet</i>}</p>
        </div>
      </div>
      <p style={{fontSize: '1.5em'}}>
        {message.message || ''}
      </p>

    </div>
}

export default SingleMessage