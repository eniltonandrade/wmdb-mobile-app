export type HistoryDetails = {
  id: string
  date: Date
  review: string | null
  rating: number | null
  tags: {
    id: string
    name: string
  } | null
  movie: {
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
    credits?: {
      cast?: {
        personId: string
        movieId: string
        character: string
        order: number
      }[]
      crew?: {
        personId: string
        movieId: string
        job: string
      }[]
    }
  }
}
