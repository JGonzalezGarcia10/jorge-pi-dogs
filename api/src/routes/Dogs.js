const {Router} = require ('express');
const {} = require ('../controllers/DogsControl');
const DogsControl = require('../controllers/DogsControl')



const router = Router ();

//GET
router.get('/name', DogsControl.searchDogsByName);
router.get('/', DogsControl.getAllDogs);
router.get('/:idDog', DogsControl.getDogsById);

//POST
router.post('/', DogsControl.createDog)

module.exports = router;