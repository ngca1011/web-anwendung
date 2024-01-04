const isValidISBN = (isbn: string): boolean => {
  const isbnPattern = /^\d{3}-\d-\d{3}-\d{5}-\d$/
  return isbnPattern.test(isbn)
}

const isValidHomepage = (homepage: string): boolean => {
  const homepageRegex = /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})(\/\S*)?$/i
  return homepageRegex.test(homepage)
}

export { isValidISBN, isValidHomepage }
