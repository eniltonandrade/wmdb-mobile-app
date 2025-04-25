import { api } from '.'

export type UpdateMovieRatingsRequest = {
  movieId: string
  ratings:
    | {
        Source: string
        Value: string
      }[]
    | undefined
}

export async function updateMovieRatings({
  movieId,
  ratings,
}: UpdateMovieRatingsRequest) {
  await api.put(`/movies/${movieId}/ratings`, { ratings })
}
