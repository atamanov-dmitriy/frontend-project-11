import renderPostsItem from './posts-item'

const postsListTemplate = document.querySelector('#rss-posts-list-template').content

const renderPostsList = (childProps, parentNode, state, i18n) => {
  const postsListContainerNode = postsListTemplate.cloneNode(true)
  const postsListNode = postsListContainerNode.querySelector('#rss-posts-list')
  const titleNode = postsListContainerNode.querySelector('h2')
  titleNode.textContent = i18n('posts.title')

  childProps.forEach((props) => {
    renderPostsItem(props, postsListNode, state, i18n)
  })

  parentNode.appendChild(postsListContainerNode)
}

export default renderPostsList
