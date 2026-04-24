import i18next from 'i18next'
import * as yup from 'yup'
import fetchRss from '../fetchRss'

const renderForm = (state) => {
  const formNode = document.querySelector('#rss-form')
  const inputNode = formNode.querySelector('#rss-form-input')
  const buttonNode = formNode.querySelector('#rss-form-button')
  const helperNode = formNode.querySelector('#rss-form-helper')

  buttonNode.textContent = i18next.t('form.button')
  inputNode.placeholder = i18next.t('form.placeholder')
  inputNode.setAttribute('aria-label', i18next.t('form.ariaLabel'))

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
      .then(() => fetchRss(inputNode.value))
      .then((data) => {
        inputNode.classList.add('is-valid')
        helperNode.classList.add('text-success')
        helperNode.textContent = i18next.t('form.validation.success')
        inputNode.value = ''
        buttonNode.removeAttribute('disabled')

        state.feeds = [data.feed, ...state.feeds]
        state.posts = [...data.posts, ...state.posts]
      })
      .catch((error) => {
        buttonNode.removeAttribute('disabled')
        inputNode.classList.add('is-invalid')
        helperNode.classList.add('text-danger')
        helperNode.textContent = error.message
      })
  })
}

export default renderForm
