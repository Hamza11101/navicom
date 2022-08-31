module.exports = (sequelize, DataTypes) => {
    const Reglement = sequelize.define("reglement", {
        type: {
          type: DataTypes.STRING
        },
      date: {
        type: DataTypes.STRING
      },
      montant: {
        type: DataTypes.STRING
      },
    });
    return Reglement;
  };