const express = require('express');
const router = express.Router();
const {
  createAlbum,
  getAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  getMyAlbums,
  getAlbumsByArtist
} = require('../controllers/albumController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { albumSchema } = require('../validators/albumValidator');

router.use(auth); // Todas las rutas protegidas

// Rutas CRUD completas
router.post('/', validate(albumSchema), createAlbum);
router.get('/', getAlbums);
router.get('/my-albums', getMyAlbums); // Álbumes del artista autenticado
router.get('/artist/:artistId', getAlbumsByArtist); // Álbumes de un artista específico
router.get('/:id', getAlbumById);
router.put('/:id', validate(albumSchema), updateAlbum);
router.delete('/:id', deleteAlbum);

module.exports = router; 