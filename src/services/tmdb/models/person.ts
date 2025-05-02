export type PersonDetails = {
  adult: boolean
  also_known_as: string[]
  birthday: string
  biography: string
  deathday?: string
  gender: number
  homepage?: string
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string
}

// Credit Entry (used for both cast and crew)
export interface Credit {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title?: string
  original_name?: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date?: string
  first_air_date?: string
  title?: string
  name?: string
  video?: boolean
  vote_average: number
  vote_count: number
  character?: string
  credit_id: string
  department?: string
  job?: string
  media_type: 'movie' | 'tv'
  episode_count?: number
}

// Credits Section
export interface Credits {
  cast: Credit[]
  crew: Credit[]
}

// Image Entry
export interface ProfileImage {
  aspect_ratio: number
  height: number
  iso_639_1: string | null
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

// Images Section
export interface Images {
  profiles: ProfileImage[]
}

// Full Response
export interface PersonResponse extends PersonDetails {
  credits: Credits
  images: Images
}
