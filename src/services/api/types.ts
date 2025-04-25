export type SortType =
  | 'count.asc'
  | 'count.desc'
  | 'average.asc'
  | 'average.desc'
  | 'name.asc'
  | 'name.desc'

export type RatingSources = 'IMDB' | 'TMDB' | 'ROTTEN_TOMATOES' | 'METACRITIC'

export type Filters = {
  selected_rating?: RatingSources
  sort_by: SortType
}

export type Ratings = {
  source: string
  value: number
}

export type Movie = {
  id: string
  title: string
  originalTitle: string
  posterPath: string | null
  backdropPath: string | null
  releaseDate: Date
  runtime: number
  tmdbId: number
  imdbId: string
  averageRating: number | null
  ratings: Ratings[]
  credits?: {
    character: string
    role: string
  }[]
}

export type Person = {
  id: string
  name: string
  tmdbId: number
  profilePath: string | null
  gender: number | null
}

export type Genre = {
  id: string
  name: string
  tmdbId: number
}

export type Tags = {
  id: string
  colorHex: string
  name: string
}

export type History = {
  id: string
  movieId: string
  date: Date
  review: string | null
  rating: number | null
  tags: Tags[]
  movie?: Movie
}

type Insight = {
  id: string
  tmdbId: number
  name: string
  appearances: number
  avgRating: number
}

export type YearInsight = {
  year: number
  count: number
  avgRating: number
}

export type CompanyInsight = Insight & {
  logoPath: string | null
}

export type PersonInsight = Insight & {
  profilePath: string | null
  score?: number
}

export type UserHistoryInsights = {
  averageRating: number
  movieCount: number
  totalRuntime: number
  activityByDayOfWeek: {
    weekday: string
    count: number
  }[]
}

export type GenreInsight = Insight

export type PersonInsightDetails = {
  movieCount: number
  averageRating: number
  totalRuntime: number
  highestRated: {
    id: string
    tmdbId: number
    averageRating: number
    runtime: number
    title: string
    posterPath: string | null
    role: string
    character: string | null
  }
  lowestRated: {
    id: string
    tmdbId: number
    averageRating: number
    runtime: number
    title: string
    posterPath: string | null
    role: string
    character: string | null
  }
  moviesCountByRoles: {
    role: string
    count: number
  }[]
  favoriteGenre: {
    id: string
    name: string
    count: number
  }
  favoriteCompany: {
    id: string
    name: string
    logoPath: string | null
    count: number
  }
  frequentCollaborators: {
    id: string
    tmdbId: number
    name: string
    profilePath: string | null
    role: string
    count: number
  }[]
}
