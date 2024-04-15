const axios = require ('axios');
const {Dog, Temperament} = require ('../db')

//GETs

// All
async function getAllDogs(req, res, next) {
    try {
        localDogs = await Dog.findAll({include: Temperament});
        const desiredTotalDogs = 100;
        const localDogsCount = localDogs.length;
        let apiDogs = [];
        let remainingDogs = desiredTotalDogs - localDogsCount;
        let page = 1;
        while (remainingDogs > 0){
            const response = await axios.get(`https://api.thedogapi.com/v1/breeds`);
            const dogsPerPage = response.data;
            if (dogsPerPage.length === 0) break;
            apiDogs = [...apiDogs, ...dogsPerPage];
            remainingDogs -= dogsPerPage.length;

            page++;
        }
            const allDogs = [...localDogs, ...apiDogs];
            res.json(allDogs);
        } catch (error) {
            next(error);
        }
    }
        
async function getDogsById(req, res, next) {
    try {
        const {idDog} = req.params;
        let dog = await Dog.findByPk(idDog);

        if (!dog) {
            const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${idDog}`);
            dog = response.data;
        }
        res.json(dog);
    } catch (error) {
        next(error);
    }
}

async function searchDogsByName (req, res){
    let {name} = req.query;
    if (!name) {
        return res.status(400).json({ mensaje: 'Se requiere un termino de busqueda valido.'});
    }

    name = name.toLowerCase();
    try{
        const dogsDB = await Dog.findAll({
            name: {$regex: new RegExp(name, 'i')}
        });

        if (dogsDB.length === 0) {
            const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
            const dogsApi = response.data;
            res.json(dogsApi);
        } else {
            res.json(dogsDB.slice(0,15));
        }

    } catch (error) {
        console.error ('Error al buscar el perro:', error);
        res.status(500).json({mensaje: 'Ocurrio un error al buscar perros.'});
    }
}

const createDog = async (req, res) => {
    try {
      const data = req.body
  
      /*
        Creamos el modelo del perro extrayendo los datos que recibimos por body
      */
      const perro = {
        image: data.image,
        name: data.name,
        height: data.height,
        weight: data.weight,
        life_span: data.life_span
    }

    /*
        Verificamos si temperamentos es un Array y si contiene algo
      */
    const temperaments = Array.isArray(data.temperamentos) ? data.temperamentos : [];
    /*
        Creamos el perro con los datos recibidos por body
      */
    const dog = await Dog.create(perro)
    /*
        Conseguimos todos los temperamentos de nuestro modelo Temnperament que coincidan con los que recibimos por body
      */
    const temperamentos = await Promise.all(temperaments.map(async temperament => {
        return await Temperament.findOne({where: {name: temperament}})
    }))
    /*
        Ahora por cada temperamento que tengamos coincidentes los vinculamos con el perro que estamos creando
      */
    await Promise.all(temperamentos.map(async temperament => {
        await dog.setTemperaments([temperament])
    }))

    /*
        Conseguimos el perro que se a creado con sus temperamentos vinculados
      */
    const dogAdded = await Dog.findAll({
        include:[{
        model: Temperament,
        attributes: ["name"],
        through: { attributes: [] }
        }]
    });

    res.send(dogAdded)
    } catch (error) {
    console.error(error)
    res.status(500).send("Hubo un error al añadir un nuevo perro", error.message);
    }
}

// const createDog = async (req, res) => {
//     try {
//         // Extraer los datos del cuerpo de la solicitud
//         const { name, height,  weight, life_span, image, temperament, createdInDb } = req.body;

//         // Verificar si el perro ya existe en la base de datos
//         const existingDog = await Dog.findOne({ where: { name } });
//         if (existingDog) {
//             return res.status(400).json({ error: 'Dog already exists' });
//         }

//         // Crear el perro en la base de datos
//         const newDog = await Dog.create({
//             name,
//             height,
//             weight,
//             life_span,
//             image,
//             createdInDb
//         });

//         // Buscar los temperamentos en la base de datos y relacionarlos con el perro
//         const temperamentsDB = await Temperament.findAll({ where: { name: temperament } });
//         await newDog.addTemperaments(temperamentsDB);

//         // Devolver una respuesta exitosa
//         return res.status(201).json({ message: "Dog created successfully" });
//     } catch (error) {
//         // Manejar errores y devolver una respuesta de error
//         console.error('Error creating dog:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };



module.exports = {
    getAllDogs,
    getDogsById,
    searchDogsByName,
    createDog
}