const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/sauces');
const auth = require ('../middleware/auth');
const multer = require ('../middleware/multer-config');
const likeCtrl = require ('../controllers/like');

router.post('/', auth, multer, stuffCtrl.createSauce);
router.put('/:id', auth, multer, stuffCtrl.modifySauce);
router.delete('/:id', auth,  stuffCtrl.deleteSauce);  
router.get('/:id', auth, stuffCtrl.getOneSauce);
router.get('/', auth, stuffCtrl.getAllSauces);
router.post('/:id/like', auth, likeCtrl.likeUser);

module.exports = router;
