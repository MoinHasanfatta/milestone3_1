const mongoose = require('mongoose');

let database;

const connect = async () => {
  if (!database) {
    const url = 'mongodb://localhost:27017/event_management';
    database = mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await database;
  }
};

const disconnect = async () => {
  if (database) {
    await mongoose.connection.close();
    database = null;
  }
};

module.exports = { connect, disconnect };
