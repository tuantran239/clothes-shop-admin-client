import React, { Fragment } from 'react'
import { ErrorResponse } from '../types/error'
import Swal from 'sweetalert2'
import { renderToString } from 'react-dom/server'

const useAlert = () => {
  const displayError = (errorResponse: ErrorResponse) => {
    return (
      <Fragment>
        <h1>{errorResponse.name}</h1>
        <p>{errorResponse.status}</p>
        <ul style={{ listStyle: 'none' }}>
          {errorResponse.error.map((err) => {
            return (
              <li key={err.field}>
                {err.field.charAt(0).toUpperCase() + err.field.slice(1)} :{' '}
                {err.message}
              </li>
            )
          })}
        </ul>
      </Fragment>
    )
  }

  const Toast = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      showCloseButton: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    return Toast
  }

  const Modal = (html: string) => {
    return Swal.mixin({
      html,
      focusConfirm: false
    })
  }

  const errorModal = (errorResponse: ErrorResponse) => {
    const str = renderToString(displayError(errorResponse))
    const model = Modal(str)
    model.fire({
      icon: 'error'
    })
  }

  const successToast = (title: string) => {
    const toast = Toast()
    toast.fire({
      icon: 'success',
      title
    })
  }

  const errorToast = (title: string) => {
    const toast = Toast()
    toast.fire({
      icon: 'error',
      title
    })
  }

  const warningToast = (title: string) => {
    const toast = Toast()
    toast.fire({
      icon: 'warning',
      title
    })
  }

  return { errorModal, successToast, errorToast, warningToast }
}

export default useAlert
