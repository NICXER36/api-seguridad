// Array en memoria para álbumes
let albums = [];
let nextAlbumId = 1;

// Función para generar ID único
const generateId = () => {
  return nextAlbumId++;
};

// CREATE - Crear álbum
const createAlbum = async (albumData) => {
  const { title, year, artistId } = albumData;
  
  const newAlbum = {
    id: generateId(),
    title,
    year,
    artistId: parseInt(artistId), // Relación con artista
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  albums.push(newAlbum);
  return newAlbum;
};

// READ - Obtener todos los álbumes
const getAllAlbums = () => {
  return albums;
};

// READ - Obtener álbum por ID
const findAlbumById = async (id) => {
  return albums.find(album => album.id === parseInt(id));
};

// READ - Obtener álbumes por artista
const getAlbumsByArtistId = async (artistId) => {
  return albums.filter(album => album.artistId === parseInt(artistId));
};

// UPDATE - Actualizar álbum
const updateAlbum = async (id, updateData) => {
  const albumIndex = albums.findIndex(album => album.id === parseInt(id));
  if (albumIndex === -1) {
    throw new Error('Álbum no encontrado');
  }
  
  const updatedAlbum = {
    ...albums[albumIndex],
    ...updateData,
    updatedAt: new Date()
  };
  
  albums[albumIndex] = updatedAlbum;
  return updatedAlbum;
};

// DELETE - Eliminar álbum
const deleteAlbum = async (id) => {
  const albumIndex = albums.findIndex(album => album.id === parseInt(id));
  if (albumIndex === -1) {
    throw new Error('Álbum no encontrado');
  }
  
  const deletedAlbum = albums.splice(albumIndex, 1)[0];
  return deletedAlbum;
};

// Función para obtener álbum con información del artista
const getAlbumWithArtist = async (id) => {
  const album = await findAlbumById(id);
  if (!album) {
    return null;
  }
  
  // Aquí podrías agregar lógica para obtener información del artista
  // Por ahora retornamos solo el álbum
  return album;
};

module.exports = {
  createAlbum,
  getAllAlbums,
  findAlbumById,
  getAlbumsByArtistId,
  updateAlbum,
  deleteAlbum,
  getAlbumWithArtist
}; 