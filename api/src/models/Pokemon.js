const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, //que no sea null
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER
    },
    ataque: {
      type: DataTypes.INTEGER
    },
    defensa: {
      type: DataTypes.INTEGER
    },
    velocidad: {
      type: DataTypes.INTEGER
    },
    altura: {
      type: DataTypes.DECIMAL
    },
    peso: {
      type: DataTypes.DECIMAL
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    img: {
      type: DataTypes.STRING,
    }
  },
    { timestamps: false });
};
