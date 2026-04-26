import axios from 'axios'

const getTextContent = (element, selector) => element.querySelector(selector)?.textContent?.trim() ?? ''

const parseRss = (response, url, i18n) => {
  const parser = new DOMParser()
  const document = parser.parseFromString(response.contents, 'text/xml')

  if (document.querySelector('parsererror')) {
    throw new Error(i18n('form.error.invalidRss'))
  }

  const channel = document.querySelector('channel')

  if (!channel) {
    throw new Error(i18n('form.error.invalidRss'))
  }

  const title = getTextContent(channel, 'title')
  const description = getTextContent(channel, 'description')

  if (!title) {
    throw new Error(i18n('form.error.invalidRss'))
  }

  const posts = Array.from(document.querySelectorAll('item'))
    .map(item => ({
      feedId: url,
      title: getTextContent(item, 'title'),
      description: getTextContent(item, 'description'),
      link: getTextContent(item, 'link'),
    }))
    .filter(post => post.title && post.link)

  return {
    feed: {
      title,
      description,
      url,
    },
    posts,
  }
}
const fetchRss = (url, i18n) => axios
  .get('https://allorigins.hexlet.app/get', {
    params: {
      disableCache: true,
      url,
    },
  })
  .catch(() => {
    throw new Error(i18n('form.error.network'))
  })
  .then(response => parseRss(response.data, url, i18n))

const filterNewPosts = (state, feedUrl, posts) => {
  const postsLinks = state.posts
    .filter(post => post.feedId === feedUrl)
    .map(post => post.link)

  const newPosts = posts.filter(post => !postsLinks.includes(post.link))
  if (newPosts.length > 0) {
    state.posts.unshift(...newPosts)
  }
}

const updateFeeds = (state, timeout, i18n) => {
  setTimeout(() => {
    const tasks = state.feeds.map(feed => fetchRss(feed.url, i18n)
      .then(parsedFeed => filterNewPosts(state, feed.url, parsedFeed.posts))
      .catch(() => null))

    return Promise.allSettled(tasks).finally(() => {
      updateFeeds(state, timeout, i18n)
    })
  }, timeout || 5000)
}

export { fetchRss, updateFeeds }
