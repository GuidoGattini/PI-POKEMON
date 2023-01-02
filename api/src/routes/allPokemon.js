
// const { Router } = require('express');
  const {getAllPokemon} = require('../Controllers/Pokemon/pokemonControllers');


//  //const axios = require("axios");


  const router = Router();

  router.get('/name', async(req, res) => {
      const {name} = req.query
      let allPokes = await getAllPokemon();
      if(name){
          let pokeName = await allPokes.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
          pokeName.length ?
          res.status(200).send(pokeName) :
          res.status(400).send ('No existe el Pokemon')
      }else{
          res.status(200).send(allPokes)
      }
  });


  module.exports = router;