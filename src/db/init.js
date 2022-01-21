const Database = require('config')

Database()

Database.exec(`CREATE TABLE profile(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  avatar TEXT,
  monthly_budget INT,
  hours_per_day INT,
  days_per_week INT,
  vacation_per_year INT,
  value_hour INT
)`)

Database.exec(`CREATE TABLE jobs(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  daily_hours INT,
  total_hours INT,
  created_at DATETIME
)`)

Database.run(`
    INSERT INTO profile( 
      name, 
      avatar, 
      monthly_budget, 
      hours_per_day, 
      days_per_week, 
      vacation_per_year, 
      value_hour
    ) VALUES(
      'Rosé',
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.letras.mus.br%2Frose%2F&psig=AOvVaw2_xS3SauIKO8axzVAYG5g_&ust=1642811070624000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLj4o6zKwfUCFQAAAAAdAAAAABAJ',
      4500,
      4,
      8,
      20,
      60
    );`)

Database.run(` INSERT INTO jobs(
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

Database.run(` INSERT INTO jobs(
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

Database.close()
