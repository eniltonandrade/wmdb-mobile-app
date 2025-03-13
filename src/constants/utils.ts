export const SORT_LIST = {
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

export const AGGREGATION_SORTING_OPTIONS = [
  {
    name: 'Total de Filmes Assistidos',
    key: 'count',
  },
  {
    name: 'Média das Notas',
    key: 'average',
  },
]

export const RATING_SOURCES_OPTIONS = [
  {
    name: 'Nota IMDB',
    key: 'imdb_rating',
  },
  {
    name: 'Nota TMDB',
    key: 'tmdb_rating',
  },
  {
    name: 'Nota Rotten Tomatoes',
    key: 'rotten_tomatoes_rating',
  },
  {
    name: 'Nota Metacritic',
    key: 'metacritic_rating',
  },
]

export const sortMap = {
  count: 'Total de Filmes',
  average: 'Nota Média',
}

export type sortMapType = keyof typeof sortMap

export const ratingSourceMap = RATING_SOURCES_OPTIONS.reduce(
  (acc, { key, name }) => {
    acc[key] = name
    return acc
  },
  {} as Record<string, string>,
)

export type ratingSourceMapType = keyof typeof ratingSourceMap
