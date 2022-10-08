import React, { useCallback, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useSetRecoilState } from 'recoil'
import { ProductTypeState } from '@/recoil/product'
import { SizeProduct } from '@/constants'
import { animateScroll as scroll } from 'react-scroll'
import Type from './Type'

interface PropsType {
  onSetColors: (input: any) => void
  onSetSizes: (input: any) => void
}

const ProductType = ({ onSetColors, onSetSizes }: PropsType) => {
  const [pts, setPts] = useState<{ name: string; comp: React.ElementType }[]>(
    []
  )
  const [count, setCount] = useState(0)
  const setProductType = useSetRecoilState(ProductTypeState)

  const max = Object.keys(SizeProduct).length * 5

  const onSetProductType = (input: any) => {
    onSetColors(input)
    onSetSizes(input)
    setProductType((pre: any) => {
      const arr = [...pre]
      const index = arr.findIndex((p) => p.index === input.index)
      if (index !== -1) {
        arr[index] = input
      } else {
        arr.push(input)
      }
      return [...arr]
    })
  }

  const onRemoveProductType = (index: any) => {
    let ptsClone = [...pts]
    ptsClone = ptsClone.filter((pts, key) => index !== key)
    setPts([...ptsClone])
    setProductType((pre: any) => {
      let arr = [...pre]
      arr = arr.filter((a) => a.index !== index)
      return [...arr]
    })
  }

  const displayPts = useCallback(() => {
    return pts.map(({ name, comp: Component }, key) => {
      return (
        <Component
          key={name}
          onSetProductType={onSetProductType}
          onRemoveProductType={(index: any) => onRemoveProductType(index)}
          index={key}
        />
      )
    })
  }, [pts])

  const onAddPt = (pt: any) => {
    // scroll.scrollTo(window.innerHeight + 50)
    setCount((pre) => pre + 1)
    setPts((pre) => {
      return [...pre, pt]
    })
  }

  return (
    <Container>
      <Row>
        <Col lg={8} className="p-4 mx-auto bg-light">
          <h4>Product Type</h4>
          {displayPts()}
          <Button
            disabled={count === max}
            type="button"
            onClick={() => onAddPt({ name: `p${count}`, comp: Type })}
          >
            Add
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductType
