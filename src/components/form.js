import * as yup from 'yup'
import { fetchRss } from '../utils'

const renderForm = (state, i18n) => {
  const formNode = document.querySelector('#rss-form')
  const inputNode = formNode.querySelector('#rss-form-input')
  const buttonNode = formNode.querySelector('[type="submit"]')
  const helperNode = formNode.querySelector('#rss-form-helper')

  buttonNode.textContent = i18n('form.button')
  inputNode.placeholder = i18n('form.placeholder')
  inputNode.setAttribute('aria-label', i18n('form.ariaLabel'))

  formNode.querySelector('[for="rss-form-input"]').textContent = i18n('form.label')
  formNode.querySelector('.form-text').textContent = i18n('form.example')

  inputNode.addEventListener('input', () => {
    inputNode.classList.remove('is-valid', 'is-invalid')
    helperNode.classList.remove('text-success', 'text-danger')
    helperNode.textContent = ''
  })

  formNode.addEventListener('submit', (event) => {
    event.preventDefault()
    buttonNode.setAttribute('disabled', true)

    yup
      .string()
      .required()
      .url()
      .notOneOf(state.feeds.map(feed => feed.url))
      .validate(inputNode.value)
      .then(() => fetchRss(inputNode.value, i18n))
      .then((data) => {
        inputNode.classList.add('is-valid')
        inputNode.focus()
        helperNode.classList.add('text-success')
        helperNode.textContent = i18n('form.validation.success')
        event.target.reset()
        buttonNode.removeAttribute('disabled')

        state.feeds = [data.feed, ...state.feeds]
        state.posts = [...data.posts, ...state.posts]
      })
      .catch((error) => {
        buttonNode.removeAttribute('disabled')
        inputNode.classList.add('is-invalid')
        inputNode.focus()
        helperNode.classList.add('text-danger')
        helperNode.textContent = error.message
      })
  })
}

export default renderForm
