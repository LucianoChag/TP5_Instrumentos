import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Detalle.css';
import { Button } from 'react-bootstrap';

const Detalle = () => {
    const { id } = useParams();
    const [instrumento, setInstrumento] = useState({});

    useEffect(() => {
        const fetchInstrumento = async () => {
            try {
                const response = await fetch(`http://localhost:3000/Detalle/${id}`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener el instrumento');
                }
                const data = await response.json();
                setInstrumento(data);
            } catch (error) {
                console.error('Error al obtener el instrumento:', error);
            }
        };

        fetchInstrumento();
    }, [id]);

    return (
        <div className="detalle-container">
            <div className="imagen-container">
                <img src={`/img/${instrumento.imagen}`} alt={instrumento.instrumento} className='img-fluid' />
                <p className="descripcion-text">Descripción:</p>
                <p className="descripcion-text">{instrumento.descripcion}</p>
            </div>
            
            <div className="informacion-container">
                <div className="detalle-derecha">
                    <h2 className="big-bold-text">{instrumento.instrumento}</h2>
                    <h1 className="big-text">Precio: {instrumento.precio}$</h1>
                    <p className="medium-text">Marca: {instrumento.marca}</p>
                    <p className="medium-text">Modelo: {instrumento.modelo}</p>
                    <p className="small-text">Cantidad vendidos: {instrumento.cantidadVendida}</p>
                    {instrumento.costoEnvio === "G" ? (
                        <p className="envio-gratis-text">🚚 Envío Gratis</p>
                    ) : (
                        <p className="envio-costo-text">
                            🚚 El costo de envio es de: {instrumento.costoEnvio}
                        </p>
                    )}
                    <Button className="btn-primary">Agregar al carrito</Button>
                </div>
            </div>
        </div>
    );
};

export default Detalle;
