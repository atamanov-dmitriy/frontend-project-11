const renderModal = (state) => {
  const modalTemplate = document.querySelector('#rss-modal-template').content

  document.body.append(modalTemplate)
}

export default renderModal
