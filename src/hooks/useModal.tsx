import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

interface PropsType {
  component: React.ReactNode
}

const useModal = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const displayModal = ({ component: Component }: PropsType) => {
    return (
      <Modal show={show} onHide={handleClose} closeButton>
        <Modal.Header closeButton />
        {Component}
      </Modal>
    )
  }

  return { show, handleClose, handleShow, displayModal }
}

export default useModal
