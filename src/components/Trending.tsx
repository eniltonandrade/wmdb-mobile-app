import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { MoviesCarrousel } from '@/components/MoviesCarrousel'
import MoviesCarrouselSkeleton from '@/components/MoviesCarrouselSkeleton'
import { getTrendingMovies } from '@/services/tmdb/trending'

const Trending = () => {
  const { data: moviesTrending, isLoading: isMoviesTrendingLoading } = useQuery(
    {
      queryKey: ['tmdb', 'trending'],
      queryFn: () => getTrendingMovies('pt-BR', 'week'),
    },
  )

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row w-full px-4 pb-4 "
      >
        <Text className="flex text-gray-50 text-lg font-pbold items-center justify-center">
          Em Alta
        </Text>
      </TouchableOpacity>

      {moviesTrending && !isMoviesTrendingLoading ? (
        <MoviesCarrousel
          movies={(moviesTrending?.results || []).map((movie) => ({
            tmdbId: movie.id,
            isWatched: false,
            posterPath: movie.poster_path,
            rating: movie.vote_average,
            releaseDate: new Date(movie.release_date),
            title: movie.title,
            userRating: null,
          }))}
          emptyListText="Recomendações de filmes aparecerão aqui."
        />
      ) : (
        <MoviesCarrouselSkeleton />
      )}
    </>
  )
}

export default Trending
