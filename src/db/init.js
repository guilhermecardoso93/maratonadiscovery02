const Database = require('./config')

const initDb = {
  async init () {
    const db = await Database()

    await db.exec(`CREATE TABLE profile(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  avatar TEXT,
  monthly_budget INT,
  hours_per_day INT,
  days_per_week INT,
  vacation_per_year INT,
  value_hour INT
)`)

    await db.exec(`CREATE TABLE jobs(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  daily_hours INT,
  total_hours INT,
  created_at DATETIME
)`)

    await db.run(`
    INSERT INTO profile( 
      name, 
      avatar, 
      monthly_budget, 
      hours_per_day, 
      days_per_week, 
      vacation_per_year, 
      value_hour
    ) VALUES(
      'Guilherme',
      '//avatars.githubusercontent.com/u/79944203?v=4',
      3000,
      4,
      8,
      20,
      60
    );`)

    await db.run(` INSERT INTO jobs(
      name,
      daily_hours,
      total_hours,
      created_at
    )VALUES(
      "Netflix",
      6,
      100,
      1617514376018
    )
  `)

    await db.run(` INSERT INTO jobs(
      name,
      daily_hours,
      total_hours,
      created_at
    )VALUES(
      "Pizzaria",
      3,
      27,
      1677614376018
    )
  `)

    await db.close()
  }
}

initDb.init()
