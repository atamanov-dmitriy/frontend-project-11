import { proxy } from 'valtio/vanilla'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import './locales/index.js'
import renderForm from './components/form.js'

const state = proxy({
  feeds: [],
})

renderForm(state)
