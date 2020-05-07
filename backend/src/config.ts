require('dotenv').config();

class Config {
  nodeId = process.env.NODE_ID;
}

module.exports = new Config();