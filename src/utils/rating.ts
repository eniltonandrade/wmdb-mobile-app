export const convertRating = (rating: string) => {
  let convertedNumber

  if (typeof rating === 'string') {
    const parts = rating.split('/')

    const numericPart = parts[0].replace(/[^\d.]/g, '')

    const result = parseFloat(numericPart)

    if (!isNaN(result)) {
      convertedNumber = result
    } else {
      return null
    }
  } else {
    convertedNumber = rating
  }

  return convertedNumber.toFixed(1)
}
