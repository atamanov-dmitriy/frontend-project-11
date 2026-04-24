import i18next from 'i18next'
import renderFeedsItem from './feeds-item'

const feedsListTemplate = document.querySelector('#rss-feeds-list-template').content

const renderFeedsList = (childProps, parentNode) => {
  const feedsListContainerNode = feedsListTemplate.cloneNode(true)
  const feedsListNode = feedsListContainerNode.querySelector('#rss-feeds-list')
  const titleNode = feedsListContainerNode.querySelector('h2')
  titleNode.textContent = i18next.t('feeds.title')

  childProps.forEach((props) => {
    renderFeedsItem(props, feedsListNode)
  })

  parentNode.appendChild(feedsListContainerNode)
}

export default renderFeedsList
