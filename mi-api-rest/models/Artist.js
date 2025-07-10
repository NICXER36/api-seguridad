const bcrypt = require('bcrypt');

// Array en memoria para artistas
let artists = [];
let nextArtistId = 1;

// Función para generar ID único
const generateId = () => {
  return nextArtistId++;
};

// Función para encriptar contraseña
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Función para comparar contraseñas
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// CREATE - Crear artista
const createArtist = async (artistData) => {
  const { username, password, name, country } = artistData;
  
  // Verificar si el artista ya existe
  const existingArtist = artists.find(artist => artist.username === username);
  if (existingArtist) {
    throw new Error('Artista ya existe');
  }
  
  const hashedPassword = await hashPassword(password);
  const newArtist = {
    id: generateId(),
    username,
    password: hashedPassword,
    name,
    country,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  artists.push(newArtist);
  return { ...newArtist, password: undefined }; // No retornar contraseña
};

// READ - Obtener artista por username
const findArtistByUsername = async (username) => {
  return artists.find(artist => artist.username === username);
};

// READ - Obtener artista por ID
const findArtistById = async (id) => {
  return artists.find(artist => artist.id === parseInt(id));
};

// READ - Obtener todos los artistas
const getAllArtists = () => {
  return artists.map(artist => ({ ...artist, password: undefined }));
};

// UPDATE - Actualizar artista
const updateArtist = async (id, updateData) => {
  const artistIndex = artists.findIndex(artist => artist.id === parseInt(id));
  if (artistIndex === -1) {
    throw new Error('Artista no encontrado');
  }
  
  const updatedArtist = {
    ...artists[artistIndex],
    ...updateData,
    updatedAt: new Date()
  };
  
  // Si se actualiza la contraseña, encriptarla
  if (updateData.password) {
    updatedArtist.password = await hashPassword(updateData.password);
  }
  
  artists[artistIndex] = updatedArtist;
  return { ...updatedArtist, password: undefined };
};

// DELETE - Eliminar artista
const deleteArtist = async (id) => {
  const artistIndex = artists.findIndex(artist => artist.id === parseInt(id));
  if (artistIndex === -1) {
    throw new Error('Artista no encontrado');
  }
  
  const deletedArtist = artists.splice(artistIndex, 1)[0];
  return { ...deletedArtist, password: undefined };
};

// Función para verificar credenciales
const verifyCredentials = async (username, password) => {
  const artist = await findArtistByUsername(username);
  if (!artist) {
    return null;
  }
  
  const isValid = await comparePassword(password, artist.password);
  return isValid ? artist : null;
};

module.exports = {
  createArtist,
  findArtistByUsername,
  findArtistById,
  getAllArtists,
  updateArtist,
  deleteArtist,
  verifyCredentials
}; 