import { MongoClient } from 'mongodb';
import fs from 'fs';

const url = 'mongodb://localhost:27017';
const dbName = 'InstrumentosDB';

const client = new MongoClient(url);

export { client };

// Función para crear la base de datos y la colección
async function crearCollection() {
    try {
        // Conexión al cliente de MongoDB
        await client.connect();

        // Base de datos
        const db = client.db(dbName);

        // Colección "instrumento"
        const collection = db.collection('instrumento');

        // 2. Definir los campos de la colección
        const instrumentoSchema = {
            id: Number,
            instrumento: String,
            marca: String,
            modelo: String,
            imagen: String,
            precio: Number,
            costoEnvio: String,
            cantidadVendida: Number,
            descripcion: String
        };

        // Crear la colección con los campos definidos
        await collection.insertOne(instrumentoSchema);
        console.log('Colección "instrumento" creada correctamente.');

    } catch (error) {
        console.error('Error al crear la base de datos y la colección:', error);
    } finally {
        // Cerrar la conexión al finalizar
        await client.close();
    }
}

const instrumentosData = JSON.parse(fs.readFileSync('./instrumentos.json', 'utf8'));

// Función para insertar los datos en la colección de MongoDB
async function insertarInstrumentosData() {
    try {
        // Conexión al cliente de MongoDB
        await client.connect();

        // Base de datos
        const db = client.db(dbName);

        // Colección "instrumento"
        const collection = db.collection('instrumento');

        // Acceder al array de instrumentos dentro del objeto JSON
        const instrumentosArray = instrumentosData.instrumentos;

        // Insertar los datos de los instrumentos en la colección
        await collection.insertMany(instrumentosArray);
        console.log('Datos de instrumentos insertados correctamente.');

    } catch (error) {
        console.error('Error al insertar los datos de instrumentos:', error);
    } finally {
        // Cerrar la conexión al finalizar
        await client.close();
    }
}

async function mostrarInstrumentos() {
    try {
        // Conexión al cliente de MongoDB
        await client.connect();

        // Base de datos
        const db = client.db(dbName);

        // Colección "instrumento"
        const collection = db.collection('instrumento');

        // Obtener todos los instrumentos de la colección
        const instrumentos = await collection.find({}).toArray();

        // Mostrar los instrumentos por consola
        console.log('Instrumentos:');
        console.log(instrumentos);

    } catch (error) {
        console.error('Error al mostrar los instrumentos:', error);
    } finally {
        // Cerrar la conexión al finalizar
        await client.close();
    }
}

crearCollection();
insertarInstrumentosData();