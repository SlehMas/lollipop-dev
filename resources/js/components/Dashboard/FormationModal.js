import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import formationService from '../../services/formation.service'

const FormationModal = (props) => {

  const selected = props.selected
  const [loading, setLoading] = useState(false)

  const DetailsBody = (props) => {

    
    return <React.Fragment>
      <ModalHeader toggle={props.toggle}>Formation #{props.selected.id}</ModalHeader>
      <ModalBody>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Nom de la formation:</strong>
              </td>
              <td>
                {' '}{props.selected.nom}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Dates de la formation:</strong>
              </td>
              <td>
                {' '}{props.selected.dates_formation && props.selected.dates_formation.map(df => <React.Fragment key={df}>
                  <span>{df.date}</span> ,
                </React.Fragment>)}
              </td>
            </tr>
          </tbody>
        </table>  
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.toggle}>Fermer</Button>
      </ModalFooter>
    </React.Fragment>
  }

  const DeleteBody = (props) => {
    
    
    const deleteFormation = () => {
      console.log('i have been clicked!')
      formationService.remove(props.selected.id).then(res => {
        props.onDelete()
        props.toggle()
      })
      .catch(err => console.log(err))
      
    }
    return <React.Fragment>
      <ModalHeader toggle={props.toggle}>Confirmer</ModalHeader>
      <ModalBody>
        <p>Vous etes sur vous voulez supprimer cette formation?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.toggle}>Annuler</Button>{' '}
        <Button color="primary" onClick={() => deleteFormation()}>Confirmer</Button>
      </ModalFooter>
    </React.Fragment>
  }
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle}>
          {props.action === 'details' ? <DetailsBody selected={selected} 
                                                     loading={loading}
                                                     toggle={props.toggle}
                                                     setLoading={setLoading}/> : 
                                        <DeleteBody selected={selected} 
                                                    loading={loading}
                                                    onDelete={props.onDelete}
                                                    toggle={props.toggle}
                                                    setLoading={setLoading}/>}
      </Modal>
    </div>
  );
}

export default FormationModal;