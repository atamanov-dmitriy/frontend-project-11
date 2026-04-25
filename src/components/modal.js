import i18next from 'i18next'

const modalNode = document.querySelector('#rss-modal')
modalNode.querySelector('.modal-footer button').textContent = i18next.t('modal.close')
modalNode.querySelector('.modal-footer a').textContent = i18next.t('modal.readFull')

const renderModal = (props) => {
  const titleNode = modalNode.querySelector('h3')
  const bodyNode = modalNode.querySelector('#rss-modal-body')
  const linkNode = modalNode.querySelector('a')

  titleNode.textContent = props.title
  bodyNode.textContent = props.description
  linkNode.href = props.link
}

export default renderModal
