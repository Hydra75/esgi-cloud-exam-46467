const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_name, process.env.DB_user, process.env.DB_password, {
  host: process.env.DB_host,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});


// authentication and synchronization
sequelize.authenticate()
  .then(() => {
    sequelize.sync().catch(() => console.log("Cannot sync the database"));
  })
  .catch(() => console.log("Cannot connect to database, please check environment credentials"));

module.exports = sequelize;