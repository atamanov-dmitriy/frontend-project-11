import i18next from 'i18next'
import renderPostsItem from './posts-item'

const postsListTemplate = document.querySelector('#rss-posts-list-template').content

const renderPostsList = (childProps, parentNode, state) => {
  const postsListContainerNode = postsListTemplate.cloneNode(true)
  const postsListNode = postsListContainerNode.querySelector('#rss-posts-list')
  const titleNode = postsListContainerNode.querySelector('h2')
  titleNode.textContent = i18next.t('posts.title')

  childProps.forEach((props) => {
    renderPostsItem(props, postsListNode, state)
  })

  parentNode.appendChild(postsListContainerNode)
}

export default renderPostsList
