import renderFeedsItem from './feeds-item'

const feedsListTemplate = document.querySelector('#rss-feeds-list-template').content

const renderFeedsList = (childProps, parentNode, i18n) => {
  const feedsListContainerNode = feedsListTemplate.cloneNode(true)
  const feedsListNode = feedsListContainerNode.querySelector('#rss-feeds-list')
  const titleNode = feedsListContainerNode.querySelector('h2')
  titleNode.textContent = i18n('feeds.title')

  childProps.forEach((props) => {
    renderFeedsItem(props, feedsListNode, i18n)
  })

  parentNode.appendChild(feedsListContainerNode)
}

export default renderFeedsList
