const {Router} = require ('express');
const TemperamentsControl = require('../controllers/TemperamentsControl')


const router = Router ();

//GET
router.get('/', TemperamentsControl.getAllTemperaments);


module.exports = router;