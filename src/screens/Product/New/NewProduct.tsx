import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useChangeEvent } from 'react-hooks-custom'
import UploadImages from '@/components/UploadImagesProduct'
import { useRecoilValue } from 'recoil'
import { ProductTypeState } from '@/recoil/product'
import { useMutation } from 'react-hooks-axios'
import { ApiUrl } from '@/constants'
import Categories from '@/components/Categories'
import { GenderProduct } from '@/constants/product'
import ProductType from '@/components/ProductType'
import useAlert from '@/hooks/useAlert'
import {
  convertMapToArray,
  handleError,
  handleSortSizes,
  handleUnique
} from '@/utils'

const NewProduct = () => {
  const { value: input, onChange } = useChangeEvent({
    name: '',
    price: '100',
    description: '',
    gender: GenderProduct.MEN
  })

  const productType = useRecoilValue(ProductTypeState)
  const [images, setImages] = useState<any>([])
  const [categories, setCategories] = useState<any>([])
  const [colors, setColors] = useState<any>(new Map<any, string>())
  const [sizes, setSizes] = useState<any>(new Map<any, string>())

  const { mutationCallback } = useMutation()
  const [createProduct, { loading }] = mutationCallback(
    ApiUrl.Product.NEW_PRODUCT
  )

  const alert = useAlert()

  const onSetImages = (files: any) => {
    setImages(files)
  }

  const onSetCategories = (category: string) => {
    const exist = categories.includes(category)
    if (!exist) {
      setCategories((pre: any) => [...pre, category])
    }
  }

  const onRemoveCategories = (category: string) => {
    let cates = [...categories]
    cates = cates.filter((c) => c !== category)
    setCategories([...cates])
  }

  const onSetColors = (input: any) => {
    colors.set(input.index, input.color)
    setColors(colors)
  }

  const onSetSizes = (input: any) => {
    sizes.set(input.index, input.size)
    setSizes(sizes)
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const colorsJson = JSON.stringify(
      convertMapToArray(colors).filter(handleUnique).sort()
    )
    const sizesJson = JSON.stringify(
      handleSortSizes(convertMapToArray(sizes).filter(handleUnique))
    )

    const formData = new FormData()
    formData.append('name', input.name)
    formData.append('gender', input.gender)
    formData.append('price', input.price)
    formData.append('description', input.description)
    formData.append('categories', categories)
    formData.append('colors', colorsJson)
    formData.append('sizes', sizesJson)
    formData.append('productType', JSON.stringify(productType))
    images.map((img: any) => {
      formData.append('images', img)
    })

    createProduct({
      body: formData,
      onCompleted() {
        alert.successToast('Create Product Successfully')
        window.location.reload()
      },
      onError(error) {
        alert.errorModal(handleError(error))
      }
    })
  }

  return (
    <Layout>
      <div className="flex flex-col flex-1 w-full">
        <Form onSubmit={onSubmitHandler}>
          <Container>
            <Row>
              <Col lg={8} className="py-5 mx-auto">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required={true}
                    onChange={onChange}
                    name="name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    onChange={onChange}
                    required={true}
                    name="gender"
                  >
                    <option value={GenderProduct.MEN}>
                      {GenderProduct.MEN}
                    </option>
                    <option value={GenderProduct.WOMEN}>
                      {GenderProduct.WOMEN}
                    </option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    name="price"
                    min={100}
                    max={5000}
                    value={input.price}
                    onChange={onChange}
                    required={true}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required={true}
                    onChange={onChange}
                    name="description"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Categories
              onSetCategories={onSetCategories}
              onRemoveCategories={onRemoveCategories}
              cates={categories}
            />
            <UploadImages onSetImages={onSetImages} />
            <ProductType onSetColors={onSetColors} onSetSizes={onSetSizes} />
            <Button variant="primary" type="submit" disabled={loading}>
              {loading && 'loading...'}
              {!loading && ' Submit'}
            </Button>
          </Container>
        </Form>
      </div>
    </Layout>
  )
}

export default NewProduct
