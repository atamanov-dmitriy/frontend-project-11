import i18next from 'i18next'
import * as yup from 'yup'

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

    yup
      .string()
      .required()
      .url()
      .notOneOf(state.feeds)
      .validate(inputNode.value)
      .then(() => {
        state.feeds.push(inputNode.value)
        inputNode.classList.add('is-valid')
        helperNode.classList.add('text-success')
        helperNode.textContent = i18next.t('errors.success')
        inputNode.value = ''
      })
      .catch((error) => {
        inputNode.classList.add('is-invalid')
        helperNode.classList.add('text-danger')
        helperNode.textContent = error.message
      })
  })
}

export default renderForm
