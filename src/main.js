import { proxy, snapshot, subscribe } from 'valtio/vanilla'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './style.css'
import './locales/index.js'
import renderForm from './components/form.js'
import renderPostsList from './components/posts-list.js'
import renderFeedsList from './components/feeds-list.js'
import { updateFeeds } from './utils.js'
import { initI18n } from './locales/index.js'

const FEEDS_UPDATE_INTERVAL = 5000

const state = proxy({
  feeds: [],
  posts: [],
})

initI18n().then((i18n) => {
  const contentContainerNode = document.querySelector('#rss-content-container')
  renderForm(state, i18n)

  subscribe(state, () => {
    const snap = snapshot(state)
    contentContainerNode.innerHTML = ''
    renderPostsList(snap.posts, contentContainerNode, state, i18n)
    renderFeedsList(snap.feeds, contentContainerNode, i18n)
  })

  updateFeeds(state, FEEDS_UPDATE_INTERVAL)
})
