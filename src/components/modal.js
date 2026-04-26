const modalNode = document.querySelector('#modal')

const renderModal = (props, i18n) => {
  modalNode.querySelector('.modal-footer button').textContent = i18n('modal.close')
  modalNode.querySelector('.modal-footer a').textContent = i18n('modal.readFull')
  const titleNode = modalNode.querySelector('h3')
  const bodyNode = modalNode.querySelector('#rss-modal-body')
  const linkNode = modalNode.querySelector('a')

  titleNode.textContent = props.title
  bodyNode.textContent = props.description
  linkNode.href = props.link
}

export default renderModal
