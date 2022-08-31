const dbConfig = require("../../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    define: {
        timestamps: false
      },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model")(sequelize, Sequelize);
db.reglement = require("./reglement.model")(sequelize, Sequelize);
db.user.hasMany(db.reglement, { as: "reglements" });
db.reglement.belongsTo(db.user, {
    foreignKey: "userId",
    as: "user",
});
module.exports = db;