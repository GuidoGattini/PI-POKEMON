const axios = require("axios");
const { Tipo } = require("../../db");

const getApiType = async () => {
  try {
    let types = await Tipo.findAll({ attributes: ["name"] });
    if (!types.length) {
      let url = `https://pokeapi.co/api/v2/type`;
      types = await axios.get(url);
      types = types.data.results.map((result) => ({
        name: result.name,
      }));
      await Tipo.bulkCreate(types);
    }
    return types;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getApiType;