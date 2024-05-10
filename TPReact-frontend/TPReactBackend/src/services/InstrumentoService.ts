// Importamos el tipo de dato IInstrumento y la clase BackendClient
import Instrumento from "../types/Instrumento";
import  BackendClient  from "./BackendClient";

// Clase InstrumentoService que extiende BackendClient para interactuar con la API de instrumentos
export default class InstrumentoService extends BackendClient<Instrumento> {}