const { 
  createAlbum, 
  getAllAlbums, 
  findAlbumById, 
  updateAlbum, 
  deleteAlbum,
  getAlbumsByArtistId,
  getAlbumWithArtist
} = require('../models/Album');
const { deleteSongsByAlbumId } = require('../models/Song');

exports.createAlbum = async (req, res, next) => {
  try {
    const albumData = {
      ...req.body,
      artistId: req.user.id // Asociar álbum al artista autenticado
    };
    const album = await createAlbum(albumData);
    res.status(201).json(album);
  } catch (err) {
    next(err);
  }
};

exports.getAlbums = async (req, res, next) => {
  try {
    const albums = getAllAlbums();
    res.json(albums);
  } catch (err) {
    next(err);
  }
};

exports.getAlbumById = async (req, res, next) => {
  try {
    const album = await findAlbumById(req.params.id);
    if (!album) {
      return res.status(404).json({ error: 'Álbum no encontrado' });
    }
    res.json(album);
  } catch (err) {
    next(err);
  }
};

exports.updateAlbum = async (req, res, next) => {
  try {
    const album = await updateAlbum(req.params.id, req.body);
    res.json(album);
  } catch (err) {
    if (err.message === 'Álbum no encontrado') {
      return res.status(404).json({ error: 'Álbum no encontrado' });
    }
    next(err);
  }
};

exports.deleteAlbum = async (req, res, next) => {
  try {
    const album = await deleteAlbum(req.params.id);
    await deleteSongsByAlbumId(req.params.id); // Borrado en cascada
    res.json({ message: 'Álbum y canciones asociadas eliminados', album });
  } catch (err) {
    if (err.message === 'Álbum no encontrado') {
      return res.status(404).json({ error: 'Álbum no encontrado' });
    }
    next(err);
  }
};

// Nueva función para obtener álbumes del artista autenticado
exports.getMyAlbums = async (req, res, next) => {
  try {
    const albums = await getAlbumsByArtistId(req.user.id);
    res.json(albums);
  } catch (err) {
    next(err);
  }
};

// Función para obtener álbumes de un artista específico
exports.getAlbumsByArtist = async (req, res, next) => {
  try {
    const albums = await getAlbumsByArtistId(req.params.artistId);
    res.json(albums);
  } catch (err) {
    next(err);
  }
}; 