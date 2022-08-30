module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      Name: {
        type: DataTypes.STRING
      },
     
    });
    return User;
  };