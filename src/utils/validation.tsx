const isValidISBN = (isbn: string) => {
  const isbnPattern = /^\d{3}-\d{1}-\d{5}-\d{3}-\d{1}$/
  console.log(isbnPattern.test(isbn))
  return isbnPattern.test(isbn)
}

const isValidHomepage = (homepage: string) => {
  const homepageRegex = /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})(\/\S*)?$/i
  return homepageRegex.test(homepage)
}

export { isValidISBN, isValidHomepage }
