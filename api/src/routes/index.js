const { Router } = require('express');
const { getAllPokemon } = require('../Controllers/Pokemon/pokemonControllers');
const { Pokemon, Tipo } = require('../db')
const getApiType = require('../Controllers/Type/getApiType')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');np

const axios = require("axios");


const router = Router();

router.get('/pokemons', async (req, res) => {

   const { name } = req.query
   let pokeTotal = await getAllPokemon();
   if (name) {
     let pokeNombre = pokeTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
     console.log(name)
     pokeNombre.length ?
       res.status(200).send(pokeNombre) :
       res.status(400).send('No existe el Pokemon')
   } else {
     res.status(200).send(pokeTotal)
   }
});




// router.get('/pokemons/:id', async (req, res) => {
//   const { id } = req.params;
//   const pokemonTotal = await getAllPokemon()
//   if (id) {
//     let pokemonId = pokemonTotal.filter(el => el.id == id)
//     pokemonId.length ? res.status(200).json(pokemonId)
//       : res.status(404).send('No encontre Pokemon con ese Id')
//   }
// });
//-------------------------------------------------------------------------------

router.get('/pokemons/:id', async (req, res) => {
  const { id } = req.params
  const allPoke = await getAllPokemon()
  let validate = id.includes("-"); // si tiene el guion es porque se encuentra en la base de datos

  if (validate) {
    try {
      let dbId = await Pokemon.findByPk(id, { include: Tipo });  // entonce la busco directo de la base de datos
      res.status(200).json([dbId]);
    } catch (err) {
      console.log(err);
    }
  }

  else {
    try {
      if (id) {
        let pokeId = allPoke.filter((el) => el.id === parseInt(id)
        );
        pokeId.length
          ? res.status(200).send(pokeId)
          : res.status(400).send("No funciona");
      }
    } catch (err) {
      res.json({ message: err });
    }
  }
});



//-------------------------------------------------------------------------------


router.get("/types", async (req, res) => {
  try {
    const allTypes = await getApiType();
    res.send(allTypes);
  } catch (error) {
    console.log(error);
  }
});



// router.post('/pokemon', async (req, res) => {
//   const { name, img, hp, ataque, type, altura, peso, defensa } = req.body;

//   if (!name || !img || !hp || !ataque || !type || !altura || !peso || !defensa)
//     return res.status(400).json({ msg: "Faltan datos" });

//   try {
//     const obj = { name, img, hp, ataque, type, altura, peso, defensa }
//     const nuevoPokemon = await Pokemon.create(obj)

//     res.send(nuevoPokemon);
//     console.log(nuevoPokemon)

//   } catch (error) {
//     console.log(error)
//   }
// });


router.post('/pokemon', async (req, res) => {
  try {
    let { name, ataque, defensa, velocidad, hp, altura, peso, img, types } = req.body;
    const pokes = await Pokemon.findAll();
                                                  //Sacar esta linea tmb si no anda
    if (!name) return res.send({ info: "El nombre es obligatorio" });
    const existe = await Pokemon.findOne({ where: { name: name } });
    if (existe) throw Error("El pokemon ya existe");
    if (!img) img = 'https://i0.wp.com/gamerfocus.co/wp-content/uploads/2015/02/Pokemon-1.png?ssl=1';

    const newPokemon = { name, ataque, defensa, velocidad, hp, altura, peso, img}; // Sacar id: ++id
    const poke = await Pokemon.create(newPokemon);

    let typess = await Tipo.findAll({ where: { name: types } })
    await poke.addTipo(typess);

    return res.status(200).send('Pokemon creado correctamente');

  } catch (error) {
    return res.status(404).send(error);
  }
});


module.exports = router;

