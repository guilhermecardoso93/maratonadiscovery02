const express = require('express')
const routes = express.Router()

const views = __dirname + '/views/'

const profile = {
  name: 'Guilherme',
  avatar: '//avatars.githubusercontent.com/u/79944203?v=4',
  'monthly-budget': 3000,
  'hours-per-day': 8,
  'days-per-week': 5,
  'vacation-per-year': 20
}
const jobs = [
  {
    name: 'Pizzaria Guloso',
    'daily-hours': 2,
    'total-hours': 40,
    created_at: Date.now()
  },
  {
    name: 'IFood',
    'daily-hours': 5.5,
    'total-hours': 100,
    created_at: Date.now()
  },
  {
    name: 'Site Anime',
    'daily-hours': 2,
    'total-hours': 50.5,
    created_at: Date.now()
  },
  {
    name: 'Portifolio GitHub',
    'daily-hours': 3.5,
    'total-hours': 60,
    created_at: Date.now()
  }
]

routes.get('/', (req, res) => { 
  const updatedJobs = jobs.map((job) => {

    const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

    const createdDate = new Date(job.created_at)
    const dueDay = createdDate.getDate() + Number(remainingDays)
    const dueDate = createdDate.setDate()
    return job
  })
  
  
  
  return res.render(views + 'index', { jobs })

})

routes.get('/job', (req, res) => res.render(views + 'job'))

routes.post('/job', (req, res) => {
  const lastId = jobs[jobs.length - 1]?.id || 1
  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    'daily-hours': req.body['daily-hours'],
    'total-hours': req.body['total-hours'],
    created_at: Date.now()
  })

  return res.redirect('/')
})

routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'))

routes.get('/profile', (req, res) => res.render(views + 'profile', { profile }))
routes.get('/index.html', (req, res) => res.redirect('/'))

module.exports = routes
