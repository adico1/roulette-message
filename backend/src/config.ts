require('dotenv').config();

class Config {
  nodeId = process.env.NODE_ID;

  get MYSQL_DB_USER() { return process.env.MYSQL_DB_USER || 'root' }
  get MYSQL_DB_NAME() { return process.env.MYSQL_DB_NAME || 'roulette_service' }
  get MYSQL_DB_PASSWORD() { return process.env.MYSQL_DB_PASSWORD || '0123456789' }
  get MYSQL_DB_ADDRESS() { return process.env.MYSQL_DB_ADDRESS || '0.0.0.0' }
  get MYSQL_DB_PORT() { return process.env.MYSQL_DB_ADDRESS || 3306 }
  get MYSQL_DB_POOL_SIZE() { return process.env.MYSQL_DB_POOL_SIZE || 10 }
}

module.exports = new Config();