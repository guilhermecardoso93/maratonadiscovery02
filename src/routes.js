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

routes.get('/', (req, res) => res.render(views + 'index'))
routes.get('/job', (req, res) => res.render(views + 'job'))
routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'))
routes.get('/profile', (req, res) => res.render(views + 'profile', { profile }))
routes.get('/index.html', (req, res) => res.redirect('/'))

module.exports = routes
