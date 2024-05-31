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
  imdbRating: number | null
  tmdbRating: number | null
  metacriticRating: number | null
  rottenTomatoesRating: number | null
  createdAt?: string | null
  updatedAt?: string | null
}
