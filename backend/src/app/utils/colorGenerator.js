function colorGenerator () {
  var hex = '0123456789ABCDEF'
  var color = '#'

  for (var i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)]
  }
  return color
}

export default colorGenerator()
