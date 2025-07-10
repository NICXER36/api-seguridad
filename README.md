# api-seguridad
--
Esta API permite gestionar un sistema musical sencillo, donde puedes registrar artistas, crear álbumes y agregar canciones.
La API está desarrollada en Node.js con Express y utiliza almacenamiento en memoria (no requiere base de datos).
Recursos principales:

-Artistas: Representan a los músicos o bandas.
-Álbumes: Colecciones de canciones, cada uno pertenece a un artista.
-Canciones: Piezas musicales individuales, cada una pertenece a un álbum y a un artista.

¿Cómo se relacionan las colecciones?
Un artista puede tener varios álbumes.
Un álbum pertenece a un solo artista.
Un álbum puede tener varias canciones.
Cada canción pertenece a un solo álbum y a un solo artista.




1. Registrar un artista
POST /api/v1/artists/register
{
  "username": "felipe",
  "password": "123456",
  "name": "Felipe",
  "country": "Chile"
}

2. Login de artista (obtener token)
   POST /api/v1/artists/login
{
  "username": "felipe",
  "password": "123456"
}

3. Crear un álbum (requiere token)
POST /api/v1/albums
{
  "title": "Mi Primer Álbum",
  "year": 2024
}

4. Crear una canción (requiere token)
POST /api/v1/songs
{
  "title": "Mi Primera Canción",
  "duration": 180,
  "genre": "Rock",
  "albumId": 1
}

5. Listar todas las canciones de un álbum
GET /api/v1/songs/album/1

6. Listar todos los álbumes de un artista
GET /api/v1/albums/artist/1

7. Actualizar un artista (PUT)
{
  "name": "Felipe Actualizado",
  "country": "Argentina"
}

8. Actualizar un álbum (PUT)
PUT /api/v1/albums/1
{
  "title": "Álbum Actualizado",
  "year": 2025
}

9. Actualizar una canción (PUT)
PUT /api/v1/songs/1
{
  "title": "Canción Editada",
  "duration": 210,
  "genre": "Pop",
  "albumId": 1
}

10. Eliminar un artista (DELETE)
DELETE /api/v1/artists/1

11. Eliminar un álbum (DELETE)
DELETE /api/v1/albums/1

12. Eliminar una canción (DELETE)
DELETE /api/v1/songs/1
