const SORT_LIST = {
  direction: [
    { name: 'Crescente', key: 'asc' },
    { name: 'Decrescente', key: 'desc' },
  ],
  order: [
    {
      name: 'Nota IMDB',
      key: 'rating_imdb',
    },
    {
      name: 'Nota TMDB',
      key: 'rating_tmdb',
    },
    {
      name: 'Nota Rotten Tomatoes',
      key: 'rating_rotten',
    },
    {
      name: 'Nota Metacritic',
      key: 'rating_metacritic',
    },
    {
      name: 'Data de Lançamento',
      key: 'release_date',
    },
    {
      name: 'Por Histórico',
      key: 'watched_date',
    },
  ],
}

export default { SORT_LIST }
