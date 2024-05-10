import Categoria from "./Categoria";
import DataModel from "./DataModel";

interface Instrumento extends DataModel<Instrumento>{
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: Int16Array;
    costo_envio: Int16Array;
    cantidad_vendida: Int16Array;
    descripcion: string;
    activo: boolean;
    categoria: Categoria;
    
}

export default Instrumento;