export const tmdbImage = (
  path: string | null,
  type: 'original' | 'w154' | 'w500' = 'original',
) => (path ? `https://image.tmdb.org/t/p/${type}/${path}` : '')
