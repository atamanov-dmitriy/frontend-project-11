const ruLocale = {
  translation: {
    header: {
      title: 'RSS агрегатор',
      subtitle: 'Начните читать RSS сегодня! Это легко, это красиво.',
      feedsHeader: 'Фиды',
      postsHeader: 'Посты',
      previewButton: 'Просмотр',
      modalClose: 'Закрыть',
      modalReadFull: 'Читать полностью',
    },
    feeds: {
      title: 'Фиды',
    },
    posts: {
      title: 'Посты',
      button: 'Просмотр',
    },
    form: {
      label: 'Ссылка RSS',
      ariaLabel: 'url',
      placeholder: 'Ссылка RSS',
      example: 'Пример: https://lorem-rss.hexlet.app/feed',
      button: 'Добавить',
      validation: {
        success: 'RSS успешно загружен',
        required: 'Не должно быть пустым',
        url: 'Ссылка должна быть валидным URL',
        duplicate: 'RSS уже существует',
      },
      error: {
        network: 'Ошибка сети',
        invalidRss: 'Ресурс не содержит валидный RSS',
      },
    },
    modal: {
      close: 'Закрыть',
      readFull: 'Читать полностью',
    },
  },
}

export { ruLocale }
