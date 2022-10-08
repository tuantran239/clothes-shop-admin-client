import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { CategoriesProduct } from '@/constants'
import { AiFillCloseCircle } from 'react-icons/ai'

interface PropsType {
  onSetCategories: (category: string) => void
  onRemoveCategories: (category: string) => void
  cates: string[]
}

const Categories = ({
  onSetCategories,
  onRemoveCategories,
  cates
}: PropsType) => {
  const displayCatergories = () => {
    return Object.keys(CategoriesProduct).map((c: any) => {
      return (
        <option key={c} value={c}>
          {c}
        </option>
      )
    })
  }

  const displaySelectCatergories = () => {
    return cates.map((c) => {
      return (
        <div className="ml-2 d-flex align-items-center">
          <p key={c} className="p-2 m-0">
            {c}
          </p>
          <AiFillCloseCircle onClick={() => onRemoveCategories(c)} />
        </div>
      )
    })
  }

  return (
    <Container>
      <Row>
        <Col lg={8} className="mx-auto mb-5">
          <h4>Categories</h4>
          <Form.Select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onSetCategories(e.target.value)
            }
          >
            <option disabled selected>Categories</option>
            {displayCatergories()}
          </Form.Select>
          <div className="my-3 d-flex">{displaySelectCatergories()}</div>
        </Col>
      </Row>
    </Container>
  )
}

export default Categories
