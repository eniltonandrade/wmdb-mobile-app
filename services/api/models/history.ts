export type History = {
  date: Date
  review: string | null
  rating: number | null
  tags?: {
    id: string
    name: string
  } | null
  movie?: {
    id: string
    tmdbId: number
    title: string
    releaseDate: Date
    backdropPath: string | null
    posterPath: string | null
    imdbRating: number | null
    tmdbRating: number | null
    rottenTomatoesRating: number | null
    metacriticRating: number | null
  }
}
