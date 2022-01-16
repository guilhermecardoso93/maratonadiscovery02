const express = require('express')
const routes = express.Router()

const views = __dirname + '/views/'

const Profile = {
  data: {
    name: 'Guilherme',
    avatar: '//avatars.githubusercontent.com/u/79944203?v=4',
    'monthly-budget': 3000,
    'hours-per-day': 8,
    'days-per-week': 5,
    'vacation-per-year': 20,
    'value-hour': 75
  },
  controllers: {
    index (req, res) {
      return res.render(views + 'profile', { profile: Profile.data })
    },
    updated (req, res) {
      const data = req.body
      const weeksPerYear = 52
      const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12
      const weekTotalHours = data['hours-per-day'] * data['days-per-week']
      const monthlyTotalHours = weekTotalHours * weeksPerMonth
      const valueHour = data['monthly-budget'] / monthlyTotalHours

      Profile.data = {
        ...Profile.data,
        ...req.body,
        'value-hour': valueHour
      }
      return res.redirect('/profile')
    }
  }
}

const Job = {
  data: [
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
  ],
  controllers: {
    index (req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
        }
      })
      return res.render(views + 'index', { jobs: updatedJobs })
    },
    create (req, res) {
      return res.render(views + 'job')
    },
    save (req, res) {
      const lastId = Job.data[Job.data.length - 1]?.id || 0
      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        created_at: Date.now()
      })
      return res.redirect('/')
    },
    show (req, res) {
      const jobId = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId))

      if (!job) {
        return res.send('Job not found')
      }
      job.budget = Job.services.calculateBudget(job, Profile.data['value-hour'])
      return res.render(views + 'job-edit', { job })
    },
    update (req, res) {
      const jobId = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId))

      if (!job) {
        return res.send('Job not found')
      }
      const updatedJob = {
        ...job,
        name: req.body.name,
        'total-hours': req.body['total-hours'],
        'daily-hours': req.body['daily-hours']
      }

      Job.data = Job.data.map(job => {
        if (Number(job.id) === Number(jobId)) {
          job = updatedJob
        }
        return job
      })

      res.redirect('/job/' + jobId)
    },
    delete (req, res) {
      const jobId = req.params.id

      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

      return res.redirect('/')
    }
  },

  services: {
    remainingDays (job) {
      const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
      const createdDate = new Date(job.created_at)
      const dueDay = createdDate.getDate() + Number(remainingDays)
      const dueDateInMs = createdDate.setDate(dueDay)
      const timeDiffInMs = dueDateInMs - Date.now()
      const dayInMs = 1000 * 60 * 60 * 24
      const dayDiff = Math.floor(timeDiffInMs / dayInMs)
      return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job['total-hours']
  }
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.delete('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.updated)
module.exports = routes
