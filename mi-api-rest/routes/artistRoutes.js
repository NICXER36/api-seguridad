const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getArtists, 
  getArtistById, 
  updateArtist, 
  deleteArtist 
} = require('../controllers/artistController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { registerSchema, loginSchema, updateSchema } = require('../validators/artistValidator');

// Rutas públicas
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Rutas protegidas (requieren autenticación)
router.use(auth);
router.get('/', getArtists);
router.get('/:id', getArtistById);
router.put('/:id', validate(updateSchema), updateArtist);
router.delete('/:id', deleteArtist);

module.exports = router; 