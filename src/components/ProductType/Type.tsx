import React, { useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useChangeEvent } from 'react-hooks-custom'
import { ColorProduct, SizeProduct } from '../../constants'

interface PropsType {
  onSetProductType: (val: any) => void
  onRemoveProductType: (index: any) => void
  index: number
}

const Type = ({ onSetProductType, onRemoveProductType, index }: PropsType) => {
  const { value: input, onChange } = useChangeEvent({
    color: ColorProduct.BLACK.name,
    size: SizeProduct.S,
    amount: 1
  })

  useEffect(() => {
    onSetProductType({ ...input, index })
  }, [input])

  const displayColors = () => {
    return Object.keys(ColorProduct).map((c) => {
      return (
        <option key={c} value={c}>
          {c}
        </option>
      )
    })
  }

  const displaySizes = () => {
    return Object.keys(SizeProduct).map((s) => {
      return (
        <option key={s} value={s}>
          {s}
        </option>
      )
    })
  }

  return (
    <Container className="my-3">
      <Row>
        <Col lg={12} className="gap-2 d-flex">
          <Form.Select
            aria-label="Default select example"
            onChange={onChange}
            name="color"
            value={input.color}
            className="w-10"
          >
            <option disabled>Color</option>
            {displayColors()}
          </Form.Select>
          <Form.Select
            aria-label="Default select example"
            onChange={onChange}
            name="size"
            value={input.size}
          >
            <option disabled>Size</option>
            {displaySizes()}
          </Form.Select>
          <Form.Control
            type="number"
            placeholder="Amount"
            name="amount"
            min={0}
            max={100}
            required={true}
            onChange={onChange}
            value={input.amount}
          />
          <Button variant="danger" onClick={() => onRemoveProductType(index)}>
            delete
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Type
