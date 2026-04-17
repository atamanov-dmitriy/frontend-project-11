import i18next from 'i18next'
import * as yup from 'yup'
import { ruLocale } from './ru.js'

i18next.init({
  lng: 'ru',
  resources: {
    ru: ruLocale,
  },
})

yup.setLocale({
  mixed: {
    required: i18next.t('form.validation.required'),
    notOneOf: i18next.t('form.validation.duplicate'),
  },
  string: {
    url: i18next.t('form.validation.url'),
  },
})

export default i18next
