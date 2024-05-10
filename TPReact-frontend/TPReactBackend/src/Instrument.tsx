import  { useState, useEffect } from 'react';
import './Instrument.css';
import { Link } from 'react-router-dom';

const Instrument = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  interface Instrumento {
    id: number;
    instrumento: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
  }

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await fetch('http://localhost:8080/instrumentos');
        console.log('Datos recibidos:', respuesta); // Agregar este registro de depuración
        const datos = await respuesta.json();
        setInstrumentos(datos);
      } catch (error) {
        console.error('No se obtuvieron los datos:', error);
      }
    };
  
    obtenerDatos();
  }, []);

  return (
    <div className="instrumento" style={{ fontFamily: 'Open Sans, Roboto, sans-serif' }}>
      {instrumentos.map(instrumento => (
        <div key={instrumento.id} className="Articulo">
          <img src={"/img/" + instrumento.imagen} alt={instrumento.instrumento} className='img-fluid'/>
          <div className="detalles">
            <p style={{ fontSize: '35px' }}>{instrumento.instrumento}</p>
            <p style={{ fontSize: '25px', fontWeight: 'bold' }}>${instrumento.precio}</p>
            {instrumento.costoEnvio === "G" ? (
              <p style={{ color: 'green', fontSize: '20px' }}>
                <img src="/img/camion.png" alt="Envío Gratis" style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Envío gratis
              </p>
            ) : (
              <p style={{ color: 'red', fontSize: '20px' }}>El costo de envío es: ${instrumento.costoEnvio}</p>
            )}
            <p style={{ color: 'grey', fontSize: '15px' }}>{instrumento.cantidadVendida} vendidos</p>
          </div>
          <div className='m-3'>
          <Link to={`/Detalle/${instrumento.id}`} className="btn btn-primary boton">Ver detalle</Link>
          </div>
          <div className='m-3'>
          <Link to={`/Editar/${instrumento.id}`} className="btn btn-primary boton">Editar</Link>
          </div>
          
         
        </div>
        
      ))}
    </div>
  );
};

export default Instrument;
