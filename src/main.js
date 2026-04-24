import { proxy, snapshot, subscribe } from 'valtio/vanilla'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import './locales/index.js'
import renderForm from './components/form.js'
import renderModal from './components/modal.js'
import renderPostsList from './components/posts-list.js'
import renderFeedsList from './components/feeds-list.js'
import { updateFeeds } from './utils.js'

const FEEDS_UPDATE_INTERVAL = 5000

const state = proxy({
  feeds: [],
  posts: [],
})

const contentContainerNode = document.querySelector('#rss-content-container')
renderForm(state)

subscribe(state, () => {
  const snap = snapshot(state)
  contentContainerNode.innerHTML = ''
  renderPostsList(snap.posts, contentContainerNode, state)
  renderFeedsList(snap.feeds, contentContainerNode)
})

renderModal(state)

updateFeeds(state, FEEDS_UPDATE_INTERVAL)
