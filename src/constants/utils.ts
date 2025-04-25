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

export const AGGREGATION_SORTING_OPTIONS_YEAR = [
  {
    name: 'Por Ano',
    key: 'year',
  },
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
    name: 'Média',
    id: 'average',
  },
  {
    name: 'IMDB',
    id: 'IMDB',
  },
  {
    name: 'TMDB',
    id: 'TMDB',
  },
  {
    name: 'Rotten Tomatoes',
    id: 'ROTTEN_TOMATOES',
  },
  {
    name: 'Metacritic',
    id: 'METACRITIC',
  },
]

export const GENDER_OPTIONS = [
  {
    id: 'todos',
    name: 'Todos',
  },
  {
    id: '1',
    name: 'Mulheres',
  },
  {
    id: '2',
    name: 'Homens',
  },
]

export const genderMap = GENDER_OPTIONS.reduce(
  (acc, { id, name }) => {
    acc[id] = name
    return acc
  },
  {} as Record<string, string>,
)

export type genderMapType = keyof typeof genderMap

export const sortMap = {
  year: 'Por Ano',
  count: 'Total',
  average: 'Nota Média',
}

export type sortMapType = keyof typeof sortMap

export const roleMap = {
  DIRECTOR: 'Diretor(a)',
  ACTOR: 'Ator',
  ACTRESS: 'Atriz',
}

export type roleMapType = keyof typeof roleMap

export const ratingSourceMap = RATING_SOURCES_OPTIONS.reduce(
  (acc, { id, name }) => {
    acc[id] = name
    return acc
  },
  {} as Record<string, string>,
)

export type ratingSourceMapType = keyof typeof ratingSourceMap
