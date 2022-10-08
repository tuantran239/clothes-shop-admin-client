import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { AxiosProvider, axios } from 'react-hooks-axios'

import 'react-phone-number-input/style.css'
import 'react-loading-skeleton/dist/skeleton.css'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Router>
    <RecoilRoot>
      <AxiosProvider axios={axios}>
        <App />
      </AxiosProvider>
    </RecoilRoot>
  </Router>
)
