import Categoria from "./Categoria";
import DataModel from "./DataModel";

interface Instrumento extends DataModel<Instrumento>{
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costo_envio: number;
    cantidad_vendida: number;
    descripcion: string;
    activo: boolean;
    categoria: Categoria;
    
}

export default Instrumento;