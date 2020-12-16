import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const SwitchSome = () => {
  const [some, setSome] = useState(false);
  const toggle = () => {
    setSome(!some)
  }
  return {some, setSome, toggle}
}

export const ModalForm  = ({children, content, modalTitle, state}) => {
  return (
    <div className="d-inline-block">
      <div color="danger" onClick={state.toggle}>{children}</div>
      <Modal isOpen={state.some} toggle={state.toggle} >
        <ModalHeader toggle={state.toggle}>{modalTitle}</ModalHeader>
        <ModalBody>
            {content}
        </ModalBody> 
      </Modal>
    </div>
  );
}

export const ModalDelete  = ({children, content, modalTitle, action, state}) => {

  const handleAction = () => {
    action();
    state.toggle();
  }

  return (
    <div className="d-inline-block">
      <div color="danger" onClick={state.toggle}>{children}</div>
      <Modal isOpen={state.some} toggle={state.toggle} >
        <ModalHeader toggle={state.toggle}>{modalTitle}</ModalHeader>
        <ModalBody>
            {content}
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button color="outline-primary" className="flex-1" onClick={state.toggle}>Cancelar</Button>
          <Button color="danger" className="flex-1" onClick={handleAction}>Eliminar</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export const ModalOpenDelete  = ({content, modalTitle, action, clean}) => {

  const [modal, setToogle] = useState(true);

  const toggle = () => { 
    setToogle(false)
    clean()
  }

  const handleAction = () => {
    action();
    toggle();
  }

  const toggleCancel = () => {
    setToogle(false)
    clean()
  }

  return (
    <div className="d-inline-block">
      <Modal isOpen={modal} toggle={toggleCancel} >
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>
            {content}
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button color="outline-primary" className="flex-1" onClick={toggleCancel}>Cancelar</Button>
          <Button color="danger" className="flex-1" onClick={handleAction}>Eliminar</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}
