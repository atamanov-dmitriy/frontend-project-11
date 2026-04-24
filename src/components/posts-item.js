import i18next from 'i18next'

const postsItemTemplate = document.querySelector('#rss-posts-item-template').content

const renderPostsItem = (props, parentNode) => {
  const postsItemNode = postsItemTemplate.cloneNode(true)

  const linkNode = postsItemNode.querySelector('a')
  const buttonNode = postsItemNode.querySelector('button')
  buttonNode.textContent = i18next.t('posts.button')

  linkNode.textContent = props.title
  linkNode.href = props.link

  buttonNode.addEventListener('click', () => {
    alert(props.id)
  })

  parentNode.appendChild(postsItemNode)
}

export default renderPostsItem
