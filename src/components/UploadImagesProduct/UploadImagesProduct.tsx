import React, { useState } from 'react'
import { RMIUploader } from 'react-multiple-image-uploader'
import { nanoid } from 'nanoid'
import { Col, Container, Row } from 'react-bootstrap'

import './UploadImages.css'

interface DataSource {
  id: any
  dataURL: string
  file?: any
}

interface PropsType {
  onSetImages: (files: any) => void
}

const UploadImagesProduct = ({ onSetImages }: PropsType) => {
  const [dataSources, setDataSources] = useState<DataSource[]>([])

  const onUpload = (data: any) => {
    const images = data.map((image: any) => {
      return { id: nanoid(), dataURL: image.dataURL, file: image.file }
    })
    setDataSources((pre: any) => {
      return [...pre, ...images]
    })
    const files = images.map((image: any) => image.file)
    onSetImages(files)
  }

  const onRemove = (id: any) => {
    let images = [...dataSources]
    images = images.filter((image) => image.id !== id)
    setDataSources([...images])
    const files = images.map((image: any) => image.file)
    onSetImages(files)
  }

  const onSelect = (data: any) => {}

  return (
    <Container>
      <Row>
        <Col lg={10} className="mx-auto">
          <RMIUploader
            onUpload={onUpload}
            onRemove={onRemove}
            onSelect={onSelect}
            dataSources={dataSources}
            warnMessage=""
          />
        </Col>
      </Row>
    </Container>
  )
}

export default UploadImagesProduct
