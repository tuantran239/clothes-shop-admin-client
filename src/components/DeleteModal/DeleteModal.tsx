import React from 'react'
import useAlert from '@/hooks/useAlert'
import { Col, Container, Row } from 'react-bootstrap'
import { useMutation } from 'react-hooks-axios'
import ButtonCustom from '../ButtonCustom'

interface PropsType {
  url: string
  title?: string
  buttonText?: string
  handleClose: () => void
  onCompleted?: () => void
}

const DeleteModal = ({
  url,
  handleClose,
  onCompleted,
  title = 'Are you sure delete this item?',
  buttonText = 'Delete'
}: PropsType) => {
  const { mutationCallback } = useMutation()
  const [deleteMutation, { loading }] = mutationCallback()

  const alert = useAlert()

  const onDeleteHandler = () => {
    deleteMutation({
      url,
      method: 'delete',
      onCompleted() {
        alert.successToast('Delete successfully!')
        handleClose()
        if (onCompleted) {
          onCompleted()
        }
      },
      onError() {
        alert.errorToast('Error cant delete')
      }
    })
  }

  return (
    <Container className="p-4 text-center">
      <Row>
        <Col>
          <h3>{title}</h3>
          <div className="gap-2 mt-5">
            <ButtonCustom
              onClick={onDeleteHandler}
              loading={loading}
              textloading="Handling..."
              disabled={loading}
              variant="danger"
            >
              {buttonText}
            </ButtonCustom>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default DeleteModal
