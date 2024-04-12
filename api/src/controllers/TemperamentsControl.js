const axios = require('axios');
const { Temperament } = require('../db');


const getAllTemperaments = async (req, res) => {
    try {
        // Obtener las razas de perros desde la API
        const response = await axios.get('https://api.thedogapi.com/v1/breeds/');
        const breeds = response.data;

        // Extraer los temperamentos de las razas de perros
        const temperaments = breeds.reduce((acc, breed) => {
            const breedTemperaments = breed.temperament ? breed.temperament.split(', ') : [];
            breedTemperaments.forEach(temperament => {
                if (temperament && !acc.includes(temperament)) {
                    acc.push(temperament);
                }
            });
            return acc;
        }, []);

        // Guardar los temperamentos en la base de datos
        await Promise.all(temperaments.map(async temperament => {
            await Temperament.findOrCreate({ where: { name: temperament } });
        }));

        // Devolver el array de temperamentos en formato JSON
        return res.json(temperaments);
    } catch (error) {
        console.error('Error fetching and saving temperaments:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



// const getAllTemperaments = async (req, res) => {
//     try {

//         const temperamentsInDB = await Temperament.findAll();
//         if (temperamentsInDB.length === 0) {

//             const temperamentsApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
//             const temperamentsData = temperamentsApi.data;

//             await Temperament.bulkCreate(temperamentsData);
//         }

//         const temperaments = await Temperament.findAll();

//         res.json(temperaments);
//     } catch (error) {
//         console.error('Error obtaining temperaments:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

module.exports = {
    getAllTemperaments
}