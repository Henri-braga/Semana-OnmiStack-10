function getFirstLetter (name) {
  const firstLetter = name.substring(1, -5).toUpperCase()

  return firstLetter
}

export default getFirstLetter
