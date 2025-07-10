require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const songRoutes = require('./routes/songRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

console.log("Montando rutas...");

// Rutas
app.use('/api/v1/artists', artistRoutes);
app.use('/api/v1/albums', albumRoutes);
app.use('/api/v1/songs', songRoutes);

// Ruta de prueba
app.get('/', (req, res) => res.send('¡API de Música funcionando con almacenamiento en memoria!'));

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT} - API de Música con almacenamiento en memoria`));