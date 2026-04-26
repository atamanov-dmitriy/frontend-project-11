import renderModal from './modal'

const postsItemTemplate = document.querySelector('#rss-posts-item-template').content

const renderPostsItem = (props, parentNode, state, i18n) => {
  const postsItemNode = postsItemTemplate.cloneNode(true)

  const linkNode = postsItemNode.querySelector('a')
  const buttonNode = postsItemNode.querySelector('button')
  buttonNode.textContent = i18n('posts.button')

  linkNode.textContent = props.title
  linkNode.href = props.link

  if (props.isVisited) {
    linkNode.classList.remove('fw-bold')
    linkNode.classList.add('fw-normal', 'link-secondary')
  }

  linkNode.addEventListener('click', (event) => {
    const currentPost = state.posts.find(post => post.id === props.id)
    currentPost.isVisited = true

    event.target.classList.remove('fw-bold')
    event.target.classList.add('fw-normal', 'link-secondary')
  })

  buttonNode.addEventListener('click', () => {
    renderModal(props, i18n)
    linkNode.classList.remove('fw-bold')
    linkNode.classList.add('fw-normal', 'link-secondary')
  })

  parentNode.appendChild(postsItemNode)
}

export default renderPostsItem
