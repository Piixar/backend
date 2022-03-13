const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/sauces');
const auth = require ('../middleware/auth');
const multer = require ('../middleware/multer-config');
const likeCtrl = require ('../controllers/like');

router.post('/', auth, multer, stuffCtrl.createThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth,  stuffCtrl.deleteThing);  
router.get('/:id', auth, stuffCtrl.getOneThing);
router.get('/', auth, stuffCtrl.getAllThings);
router.post('/:id/like', auth, likeCtrl.likeUser);

module.exports = router;
