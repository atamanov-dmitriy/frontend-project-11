import i18next from 'i18next'
import * as yup from 'yup'
import { ruLocale } from './ru.js'

const initI18n = () => i18next.init({
  lng: 'ru',
  resources: {
    ru: ruLocale,
  },
}).then((i18n) => {
  yup.setLocale({
    mixed: {
      required: i18n('form.validation.required'),
      notOneOf: i18n('form.validation.duplicate'),
    },
    string: {
      url: i18n('form.validation.url'),
    },
  })

  return i18n
})

export { initI18n }
