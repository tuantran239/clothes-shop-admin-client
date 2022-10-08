import React, { ButtonHTMLAttributes, Fragment } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { Variant } from 'react-bootstrap/esm/types'

interface JSXElement extends React.ReactElement<any> {}
type Element = JSXElement | null

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: Element
  variant?: Variant
  block?: boolean
  loading?: boolean
  children: React.ReactNode
  textloading?: string
}

const ButtonCustom = ({
  children,
  icon: Icon,
  className,
  variant = 'primary',
  type,
  block = false,
  loading,
  onClick,
  disabled,
  textloading
}: PropsType) => {
  return (
    <Fragment>
      {block && (
        <div className="gap-2 d-grid">
          <Button
            className={className}
            variant={variant}
            type={type}
            onClick={onClick}
            disabled={disabled}
          >
            <span>
              {Icon && !loading && <i>{Icon}</i>}{' '}
              {loading && (
                <>
                  <Spinner size="sm" animation="border" variant="light" />{' '}
                  {textloading || 'Loading...'}
                </>
              )}
              {!loading && children}
            </span>
          </Button>
        </div>
      )}
      {!block && (
        <Button
          className={className}
          variant={variant}
          type={type}
          onClick={onClick}
          disabled={disabled}
        >
          <span>
            {Icon && !loading && <i>{Icon}</i>}
            {loading && (
              <>
                <Spinner size="sm" animation="border" variant="light" />{' '}
                {textloading || 'Loading...'}
              </>
            )}
            {!loading && children}
          </span>
        </Button>
      )}
    </Fragment>
  )
}

export default ButtonCustom
