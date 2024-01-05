const isValidISBN = (isbn: string): boolean => {
  const isbnPattern = /^[\d-]{13}|[\d-]{17}$/u
  return isbnPattern.test(isbn)
}

const isValidHomepage = (homepage: string): boolean => {
  const homepageRegex = /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})(\/\S*)?$/i
  return homepageRegex.test(homepage)
}

export { isValidISBN, isValidHomepage }
