const feedsItemTemplate = document.querySelector('#rss-feeds-item-template').content

const renderFeedsItem = (props, parentNode) => {
  const feedsItemNode = feedsItemTemplate.cloneNode(true)

  const titleNode = feedsItemNode.querySelector('h3')
  const descriptionNode = feedsItemNode.querySelector('p')

  titleNode.textContent = props.title
  descriptionNode.textContent = props.description

  parentNode.appendChild(feedsItemNode)
}

export default renderFeedsItem
