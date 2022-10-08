import React, { useState } from 'react'
import { Form, Container, Row, Col, InputGroup, Button } from 'react-bootstrap'

interface PropsType {
  onSetSearch: (val: string) => void
  onSetRows: (val: string) => void
}

const Filter = ({ onSetSearch, onSetRows }: PropsType) => {
  const [search, setSearch] = useState<string>('')

  const Rows = ['1000', '2000', '3000', '4000', '5000']
  const displayRows = () => {
    return Rows.map((row: any) => {
      return (
        <option key={row} value={row}>
          {row}
        </option>
      )
    })
  }

  return (
    <Container className="mt-2">
      <Row>
        <Col className="gap-2 d-flex">
          <Form.Group className="mb-3 w-72">
            <Form.Label>
              <h6 className="mb-0">Search</h6>
            </Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
              />
              <Button
                variant="outline-secondary"
                onClick={() => onSetSearch(search)}
              >
                Search
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3 w-52">
            <Form.Label>
              <h6 className="mb-0">Rows</h6>
            </Form.Label>
            <Form.Select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onSetRows(e.target.value)
              }
            >
              {displayRows()}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  )
}

export default Filter
