import i18next from 'i18next'
import renderModal from './modal'

const postsItemTemplate = document.querySelector('#rss-posts-item-template').content

const renderPostsItem = (props, parentNode, state) => {
  const postsItemNode = postsItemTemplate.cloneNode(true)

  const linkNode = postsItemNode.querySelector('a')
  const buttonNode = postsItemNode.querySelector('button')
  buttonNode.textContent = i18next.t('posts.button')

  linkNode.textContent = props.title
  linkNode.href = props.link

  if (props.isVisited) {
    linkNode.classList.remove('fw-bold')
    linkNode.classList.add('fw-normal')
  }

  linkNode.addEventListener('click', (event) => {
    const currentPost = state.posts.find(post => post.id === props.id)
    currentPost.isVisited = true

    event.target.classList.remove('fw-bold')
    event.target.classList.add('fw-normal')
  })

  buttonNode.addEventListener('click', () => {
    renderModal(props)
    linkNode.classList.remove('fw-bold')
    linkNode.classList.add('fw-normal')
  })

  parentNode.appendChild(postsItemNode)
}

export default renderPostsItem
