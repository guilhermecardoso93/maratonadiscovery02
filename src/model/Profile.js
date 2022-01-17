let data = {
  name: 'Guilherme',
  avatar: '//avatars.githubusercontent.com/u/79944203?v=4',
  'monthly-budget': 3000,
  'hours-per-day': 8,
  'days-per-week': 5,
  'vacation-per-year': 20,
  'value-hour': 75
}

module.exports = {
  get () {
    return data
  },
  update (newData) {
    data = newData
  }
}
