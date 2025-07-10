const jwt = require('jsonwebtoken');
const { 
  createArtist, 
  findArtistByUsername, 
  verifyCredentials,
  getAllArtists,
  findArtistById,
  updateArtist,
  deleteArtist
} = require('../models/Artist');

exports.register = async (req, res, next) => {
  try {
    const { username, password, name, country } = req.body;
    const artist = await createArtist({ username, password, name, country });
    res.status(201).json({ message: 'Artista registrado', artist });
  } catch (err) {
    if (err.message === 'Artista ya existe') {
      return res.status(400).json({ error: 'Artista ya existe' });
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const artist = await verifyCredentials(username, password);
    
    if (!artist) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }
    
    const token = jwt.sign({ id: artist.id }, process.env.JWT_SECRET, { 
      expiresIn: '1h' 
    });
    
    res.json({ 
      token, 
      artist: { id: artist.id, username: artist.username, name: artist.name } 
    });
  } catch (err) {
    next(err);
  }
};

// Funciones CRUD completas
exports.getArtists = async (req, res, next) => {
  try {
    const artists = getAllArtists();
    res.json(artists);
  } catch (err) {
    next(err);
  }
};

exports.getArtistById = async (req, res, next) => {
  try {
    const artist = await findArtistById(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artista no encontrado' });
    }
    res.json({ ...artist, password: undefined });
  } catch (err) {
    next(err);
  }
};

exports.updateArtist = async (req, res, next) => {
  try {
    const artist = await updateArtist(req.params.id, req.body);
    res.json(artist);
  } catch (err) {
    if (err.message === 'Artista no encontrado') {
      return res.status(404).json({ error: 'Artista no encontrado' });
    }
    next(err);
  }
};

exports.deleteArtist = async (req, res, next) => {
  try {
    const artist = await deleteArtist(req.params.id);
    res.json({ message: 'Artista eliminado', artist });
  } catch (err) {
    if (err.message === 'Artista no encontrado') {
      return res.status(404).json({ error: 'Artista no encontrado' });
    }
    next(err);
  }
}; 