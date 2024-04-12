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
        const { image, name, height, weight, temperaments, life_span } = req.body;

        // Verifica que se proporcionen todos los campos necesarios
        if (!image || !name || !height || !weight || !temperaments || !life_span) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        // Crea el perro en la base de datos
        const newDog = await Dog.create({
            image,
            name,
            height,
            weight,
            life_span,
        });

        // Busca los temperamentos en la base de datos
        const temperamentsDB = await Temperament.findAll({
            where: { name: temperaments }, // Busca los temperamentos por nombre
        });

        // Asocia los temperamentos encontrados con el perro creado
        await newDog.addTemperaments(temperamentsDB);

        res.status(201).json({ message: 'Perro creado exitosamente', dog: newDog });
    } catch (error) {
        console.error('Error al crear el perro:', error);
        res.status(500).json({ message: 'Hubo un error al crear el perro' });
    }
};
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