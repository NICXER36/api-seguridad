const express = require('express');
const router = express.Router();
const {
  createSong,
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
  getMySongs,
  getSongsByAlbum,
  getSongsByArtist,
  getAlbumDuration
} = require('../controllers/songController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { songSchema } = require('../validators/songValidator');

router.use(auth); // Todas las rutas protegidas

// Rutas CRUD completas
router.post('/', validate(songSchema), createSong);
router.get('/', getSongs);
router.get('/my-songs', getMySongs); // Canciones del artista autenticado
router.get('/album/:albumId', getSongsByAlbum); // Canciones de un álbum específico
router.get('/artist/:artistId', getSongsByArtist); // Canciones de un artista específico
router.get('/album/:albumId/duration', getAlbumDuration); // Duración de un álbum
router.get('/:id', getSongById);
router.put('/:id', validate(songSchema), updateSong);
router.delete('/:id', deleteSong);

module.exports = router; 