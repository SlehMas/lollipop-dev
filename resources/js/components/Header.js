import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import classnames from 'classnames'

import messageService from '../services/messages.service'


const Header = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentNav, setCurrentNav] = useState(window.location.pathname)

  const toggle = () => setIsOpen(!isOpen);
  const toggleModal = () => setModalOpen(!modalOpen)


  const ContactModal = (props) => {
    let emailRef = useRef(null)
    let objectRef = useRef(null)
    let messageRef = useRef(null)

    const [errors, setErrors] = useState({});
    const sendMessage = (e) => {
      setErrors({})
      let tmpErr = {}
      if (!emailRef.value) tmpErr.email = true
      if (!messageRef.value) tmpErr.message = true
      if (tmpErr.email || tmpErr.message) {
        setErrors(tmpErr)
        return
      }
      messageService.save({
        email: emailRef.value,
        object: objectRef.value,
        message: messageRef.value
      }).then(
        res => { }
      ).catch(err => { })
        .finally(() => props.toggleModal())
    }
    return <Modal isOpen={props.modalOpen} toggle={props.toggleModal} className="contactModal">
      <ModalHeader toggle={props.toggleModal}></ModalHeader>
      <ModalBody>
        <div style={{ textAlign: 'center' }}>
          <h1>Contactez Nous</h1>
          <input type="text"
            name="nom"
            placeholder="Email *"
            className={classnames("lollipop-input mb-4", errors.email && "error")}
            ref={(n) => emailRef = n} />
          {(errors && errors.email) && <p className="error_email" style={{ display: 'block' }}>Le email est requis</p>}
          <input type="text"
            name="objet"
            placeholder="Objet"
            className="lollipop-input mb-4"
            ref={(n) => objectRef = n} />
          <textarea cols="60" rows="5"
            className={classnames("idea-textarea", errors.message && "error_full_border")}
            name="message"
            placeholder="Votre message"
            ref={(n) => messageRef = n}
            style={{ resize: 'none', paddingTop: '10px', paddingLeft: '10px', borderRadius: '10px', maxWidth: '100%' }}></textarea>
          {(errors && errors.message) && <p className="error_message" style={{ display: 'block' }}>Le message est requis</p>}

        </div>
      </ModalBody>
      <ModalFooter style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="ml-auto" style={{ maxWidth: '170px' }}>
          <button className="btn btn-lollipop-prim" onClick={sendMessage}>Envoyer</button>
        </div>
      </ModalFooter>
    </Modal>

  }
  return (
    <React.Fragment>
      <div className="Header container-fluid">
        <Navbar light expand="md" className="navbar-sticky">
          <NavbarBrand href="/"><img src="../../assets/lollipop.svg" alt="" width="120" /></NavbarBrand>
          <NavbarToggler onClick={toggle} className={
            classnames(isOpen ? "toggle-open" : "")
          } />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto mt-1" navbar>
              <NavItem>
                <Link to="/inscription" className={classnames(
                  "ml-sm-5 ml-md-5 ml-lg-5"
                )}>
                  Calendrier des formations
              </Link>
              </NavItem>
              <NavItem>
                <a href="/programmes" className={classnames(
                  "ml-sm-5 ml-md-5 ml-lg-5"
                )}>
                  Nos Programmes
              </a>
              </NavItem>
              <NavItem>
                <Link to="/team" className={classnames(
                  "ml-sm-5 ml-md-5 ml-lg-5"
                )}>
                    La Team
                </Link>
              </NavItem>
              <NavItem>
                <a href="/blog" className={classnames(
                  "ml-sm-5 ml-md-5 ml-lg-5"
                )}>
                    Blog
                </a>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="ml-sm-5 ml-md-5 ml-lg-5 py-0">
                  Certification
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <a href="/blog/ajouter-dans-votre-profil-linkedin">Comment ajouter dans votre profil LinkedIn?</a>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <button className="btn btn-lollipop-sec ml-sm-5 ml-md-5 ml-lg-5" onClick={toggleModal}>
                  Contact
              </button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      <ContactModal modalOpen={modalOpen} toggleModal={() => toggleModal()} />
    </React.Fragment>
  )
}

export default Header
