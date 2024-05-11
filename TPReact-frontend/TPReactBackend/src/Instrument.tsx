import React, { useState, useEffect } from 'react';
import './Instrument.css';
import { Link } from 'react-router-dom';
import { Button, Modal } from "react-bootstrap";
import ModalInstrumentos from "./ui/Modal/ModalInstrumento"; // Importa el componente ModalInstrumentos
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { toggleModal } from "./redux/slices/modal";

const Instrument = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [instrumentoActivo, setInstrumentoActivo] = useState<Instrumento | null>(null);
  const dispatch = useAppDispatch();

  interface Instrumento {
    id: number;
    instrumento: string;
    imagen: string;
    precio: number;
    costo_envio: number;
    cantidad_vendida: number;
    // Agrega las propiedades faltantes aquí
    marca: string;
    modelo: string;
    descripcion: string;
    activo:boolean
    // Asegúrate de que la propiedad categoria esté también incluida aquí
    categoria: {
      id: number;
      denominacion: string;
    };
  }

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await fetch('http://localhost:8080/instrumentos');
        console.log('Datos recibidos:', respuesta);
        const datos = await respuesta.json();
        setInstrumentos(datos);
      } catch (error) {
        console.error('No se obtuvieron los datos:', error);
      }
    };
  
    obtenerDatos();
  }, []);

  const handleEditarInstrumento = (instrumento: Instrumento) => {
    setInstrumentoActivo(instrumento);
    dispatch(toggleModal({ modalName: "modal" }));
  };

  return (
    <div className="instrumento" style={{ fontFamily: 'Open Sans, Roboto, sans-serif' }}>
      {instrumentos.map(instrumento => (
        <div key={instrumento.id} className="Articulo">
          <img src={"/img/" + instrumento.imagen} alt={instrumento.instrumento} className='img-fluid'/>
          <div className="detalles">
            <p style={{ fontSize: '35px' }}>{instrumento.instrumento}</p>
            <p style={{ fontSize: '25px', fontWeight: 'bold' }}>${instrumento.precio}</p>
            {instrumento.costo_envio === 0 ? (
              <p style={{ color: 'green', fontSize: '20px' }}>
                <img src="/img/camion.png" alt="Envío Gratis" style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Envío gratis
              </p>
            ) : (
              <p style={{ color: 'red', fontSize: '20px' }}>El costo de envío es: ${instrumento.costo_envio}</p>
            )}
            <p style={{ color: 'grey', fontSize: '15px' }}>{instrumento.cantidad_vendida} vendidos</p>
          </div>
          <div className='m-3'>
            <Button onClick={() => handleEditarInstrumento(instrumento)} className="btn btn-primary boton">Editar</Button>
          </div>
          <div className='m-3'>
            <Link to={`/Detalle/${instrumento.id}`} className="btn btn-primary boton">Ver detalle</Link>
          </div>
        </div>
      ))}

      {/* Agrega el modal de edición con el instrumento activo */}
      {instrumentoActivo && (
        <ModalInstrumentos
          getInstrumentos={() => {}} 
          instrumentoActivo={instrumentoActivo}
        />
      )}
    </div>
  );
};


export default Instrument;
