const { 
  createSong, 
  getAllSongs, 
  findSongById, 
  updateSong, 
  deleteSong,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongWithRelations,
  getAlbumDuration
} = require('../models/Song');

exports.createSong = async (req, res, next) => {
  try {
    const songData = {
      ...req.body,
      artistId: req.user.id // Asociar canción al artista autenticado
    };
    const song = await createSong(songData);
    res.status(201).json(song);
  } catch (err) {
    next(err);
  }
};

exports.getSongs = async (req, res, next) => {
  try {
    const songs = getAllSongs();
    res.json(songs);
  } catch (err) {
    next(err);
  }
};

exports.getSongById = async (req, res, next) => {
  try {
    const song = await findSongById(req.params.id);
    if (!song) {
      return res.status(404).json({ error: 'Canción no encontrada' });
    }
    res.json(song);
  } catch (err) {
    next(err);
  }
};

exports.updateSong = async (req, res, next) => {
  try {
    const song = await updateSong(req.params.id, req.body);
    res.json(song);
  } catch (err) {
    if (err.message === 'Canción no encontrada') {
      return res.status(404).json({ error: 'Canción no encontrada' });
    }
    next(err);
  }
};

exports.deleteSong = async (req, res, next) => {
  try {
    const song = await deleteSong(req.params.id);
    res.json({ message: 'Canción eliminada', song });
  } catch (err) {
    if (err.message === 'Canción no encontrada') {
      return res.status(404).json({ error: 'Canción no encontrada' });
    }
    next(err);
  }
};

// Nueva función para obtener canciones del artista autenticado
exports.getMySongs = async (req, res, next) => {
  try {
    const songs = await getSongsByArtistId(req.user.id);
    res.json(songs);
  } catch (err) {
    next(err);
  }
};

// Función para obtener canciones de un álbum específico
exports.getSongsByAlbum = async (req, res, next) => {
  try {
    const songs = await getSongsByAlbumId(req.params.albumId);
    res.json(songs);
  } catch (err) {
    next(err);
  }
};

// Función para obtener canciones de un artista específico
exports.getSongsByArtist = async (req, res, next) => {
  try {
    const songs = await getSongsByArtistId(req.params.artistId);
    res.json(songs);
  } catch (err) {
    next(err);
  }
};

// Función para obtener duración de un álbum
exports.getAlbumDuration = async (req, res, next) => {
  try {
    const duration = await getAlbumDuration(req.params.albumId);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    res.json({ 
      durationInSeconds: duration,
      durationFormatted: `${minutes}:${seconds.toString().padStart(2, '0')}`
    });
  } catch (err) {
    next(err);
  }
}; 