import axios from 'axios'

const getTextContent = (element, selector) => element.querySelector(selector)?.textContent?.trim() ?? ''

const parseRss = (response) => {
  const { contents, status } = response
  const parser = new DOMParser()
  const document = parser.parseFromString(contents, 'text/xml')

  if (document.querySelector('parsererror')) {
    throw new Error('from.error.invalidRss')
  }

  const channel = document.querySelector('channel')

  if (!channel) {
    throw new Error('from.error.invalidRss')
  }

  const title = getTextContent(channel, 'title')
  const description = getTextContent(channel, 'description')

  if (!title) {
    throw new Error('from.error.invalidRss')
  }

  const posts = Array.from(document.querySelectorAll('item'))
    .map(item => ({
      id: crypto.randomUUID(),
      feedId: status.url,
      title: getTextContent(item, 'title'),
      description: getTextContent(item, 'description'),
      link: getTextContent(item, 'link'),
    }))
    .filter(post => post.title && post.link)

  return {
    feed: {
      title,
      description,
      url: status.url,
    },
    posts,
  }
}

const buildProxyUrl = (url) => {
  const proxyUrl = new URL('https://allorigins.hexlet.app/get')
  proxyUrl.searchParams.set('disableCache', 'true')
  proxyUrl.searchParams.set('url', url)

  return proxyUrl.toString()
}

const fetchRss = url => axios
  .get(buildProxyUrl(url))
  .then(response => parseRss(response.data))
  .catch(() => {
    throw new Error('from.error.network')
  })

const filterNewPosts = (state, feedUrl, posts) => {
  const postsLinks = state.posts
    .filter(post => post.feedId === feedUrl)
    .map(post => post.link)

  const newPosts = posts.filter(post => !postsLinks.includes(post.link))
  if (newPosts.length > 0) {
    state.posts.unshift(...newPosts)
  }
}

const updateFeeds = (state, timeout) => {
  setTimeout(() => {
    const tasks = state.feeds.map(feed => fetchRss(feed.url)
      .then(parsedFeed => filterNewPosts(state, feed.url, parsedFeed.posts))
      .catch(() => null))

    return Promise.allSettled(tasks).finally(() => {
      updateFeeds(state, timeout)
    })
  }, timeout || 5000)
}

export { fetchRss, updateFeeds }
