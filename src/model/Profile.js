const Database = require('../db/config')

module.exports = {
  async get () {
    const db = await Database()

    const data = await db.get(`
    SELECT * FROM profile`)

    await db.close()

    return {
      name: data.name,
      avatar: data.avatar,
      'monthly-budget': data.monthly_budget,
      'hours-per-day': data.hours_per_day,
      'days-per-week': data.hours_per_day,
      'vacation-per-year': data.vacation_per_year,
      'value-hour': data.value_hour
    }
  },
  async update (newData) {
    const db = await Database()

    db.run(`UPDATE profile SET 
        name = '${newData.name}',
        avatar = '${newData.avatar}',
        monthly_budget = ${newData['monthly-budget']},
        hours_per_day = ${newData['hours-per-day']},
        days_per_week = ${newData['hours-per-day']},
        vacation_per_year = ${newData['vacation-per-year']},
        value_hour = ${newData['value-hour']}
     `)

    await db.close()
  }
}
