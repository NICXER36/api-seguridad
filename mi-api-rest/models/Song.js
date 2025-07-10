// Array en memoria para canciones
let songs = [];
let nextSongId = 1;

// Función para generar ID único
const generateId = () => {
  return nextSongId++;
};

// CREATE - Crear canción
const createSong = async (songData) => {
  const { title, duration, genre, artistId, albumId } = songData;
  
  const newSong = {
    id: generateId(),
    title,
    duration, // en segundos
    genre,
    artistId: parseInt(artistId), // Relación con artista
    albumId: parseInt(albumId), // Relación con álbum
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  songs.push(newSong);
  return newSong;
};

// READ - Obtener todas las canciones
const getAllSongs = () => {
  return songs;
};

// READ - Obtener canción por ID
const findSongById = async (id) => {
  return songs.find(song => song.id === parseInt(id));
};

// READ - Obtener canciones por artista
const getSongsByArtistId = async (artistId) => {
  return songs.filter(song => song.artistId === parseInt(artistId));
};

// READ - Obtener canciones por álbum
const getSongsByAlbumId = async (albumId) => {
  return songs.filter(song => song.albumId === parseInt(albumId));
};

// UPDATE - Actualizar canción
const updateSong = async (id, updateData) => {
  const songIndex = songs.findIndex(song => song.id === parseInt(id));
  if (songIndex === -1) {
    throw new Error('Canción no encontrada');
  }
  
  const updatedSong = {
    ...songs[songIndex],
    ...updateData,
    updatedAt: new Date()
  };
  
  songs[songIndex] = updatedSong;
  return updatedSong;
};

// DELETE - Eliminar canción
const deleteSong = async (id) => {
  const songIndex = songs.findIndex(song => song.id === parseInt(id));
  if (songIndex === -1) {
    throw new Error('Canción no encontrada');
  }
  
  const deletedSong = songs.splice(songIndex, 1)[0];
  return deletedSong;
};

// Función para obtener canción con información del artista y álbum
const getSongWithRelations = async (id) => {
  const song = await findSongById(id);
  if (!song) {
    return null;
  }
  
  // Aquí podrías agregar lógica para obtener información del artista y álbum
  // Por ahora retornamos solo la canción
  return song;
};

// Función para obtener duración total de un álbum
const getAlbumDuration = async (albumId) => {
  const albumSongs = await getSongsByAlbumId(albumId);
  return albumSongs.reduce((total, song) => total + song.duration, 0);
};

// DELETE - Eliminar todas las canciones de un álbum
const deleteSongsByAlbumId = async (albumId) => {
  songs = songs.filter(song => song.albumId !== parseInt(albumId));
};

module.exports = {
  createSong,
  getAllSongs,
  findSongById,
  getSongsByArtistId,
  getSongsByAlbumId,
  updateSong,
  deleteSong,
  getSongWithRelations,
  getAlbumDuration,
  deleteSongsByAlbumId // exportar la nueva función
}; 