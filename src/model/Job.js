let data = [
  {
    id: 1,
    name: 'Pizzaria Guloso',
    'daily-hours': 2,
    'total-hours': 10,
    budget: 4500,
    created_at: Date.now()
  },
  {
    id: 2,
    name: 'IFood',
    'daily-hours': 7.5,
    'total-hours': 10,
    budget: 2500,
    created_at: Date.now()
  },
  {
    id: 3,
    name: 'Site Anime',
    'daily-hours': 2,
    'total-hours': 40.5,
    budget: 1000,
    created_at: Date.now()
  },
  {
    id: 4,
    name: 'Portifolio GitHub',
    'daily-hours': 3.5,
    'total-hours': 60,
    budget: 3000,
    created_at: Date.now()
  }
]

module.exports = {
  get () {
    return data
  },
  update (newJob) {
    data = newJob
  },
  delete (id) {
    data = data.filter(job => Number(job.id) !== Number(id))
  },
  create (newJob) {
    data.push(newJob)
  }
}
