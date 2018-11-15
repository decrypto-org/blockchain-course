module.exports = {
  development: {
    'use_env_variable': 'DB_URI',
    'dialect': 'postgres'
  },
  test: {
    'use_env_variable': 'DB_URI',
    'dialect': 'postgres'
  },
  production: {
    'use_env_variable': 'DB_URI',
    'dialect': 'postgres',
    'logging': false
  }
}
