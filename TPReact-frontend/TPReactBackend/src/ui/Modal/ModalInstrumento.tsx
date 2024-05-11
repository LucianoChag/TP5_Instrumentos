import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Instrumento from "../../types/Instrumento"; // Importa la interfaz Intrumento
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleModal } from "../../redux/slices/modal";
import Swal from "sweetalert2"; // Importa SweetAlert2
import InstrumentoService from "../../services/InstrumentoService";

interface ModalInstrumentosProps {
  getInstrumentos: () => void;
  instrumentoActivo: Instrumento; // Agrega esta propiedad a la interfaz de props
}

const ModalInstrumentos: React.FC<ModalInstrumentosProps> = ({
  getInstrumentos,
  instrumentoActivo, // Agrega esta propiedad a la desestructuración
}) => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const instrumentoService = new InstrumentoService(); // Instancia InstrumentoService
  const url = import.meta.env.VITE_API_URL;

  const initialValues: Instrumento = {
    id: 0,
    instrumento: "",
    marca: "",
    modelo: "",
    imagen: "",
    precio: 0,
    costo_envio: 0,
    cantidad_vendida: 0,
    descripcion: "",
    activo: false,
    categoria: {
      id: 0,
      denominacion: "",
    },
  };

  

  const modal = useAppSelector((state) => state.modal.modal);
  const elementActive = useAppSelector((state) => state.tabla.elementActive);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(toggleModal({ modalName: "modal" }));
  };

  return (
    <Modal
      id={"modalInstrumento"}
      show={modal}
      onHide={handleClose}
      size={"lg"}
      backdrop="static"
      keyboard={false}
      centered // Centra el modal en la pantalla
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {elementActive ? "Editar instrumento:" : "Añadir intrumento:"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={Yup.object({
            nombre: Yup.string().required("Campo requerido"),
            marca: Yup.string().required("Campo requerido"),
            modelo: Yup.string().required("Campo requerido"),
            descripcion: Yup.string().required("Campo requerido"),
            imagen: Yup.string().required("Campo requerido"),
            precio: Yup.number().required("Campo requerido"),
            costo_envio: Yup.number().required("Campo requerido"),
            cantidad_vendida: Yup.number().required("Campo requerido"),
            //CATEGORIA: AGREGAR COMBOBOX
            categoria: Yup.number().required("Campo requerido"),

            // Agrega validaciones para otros campos si es necesario
          })}
          initialValues={elementActive ? elementActive : initialValues}
          enableReinitialize={true}
          onSubmit={async (values: Instrumento) => {
            try {
              if (elementActive) {
                // Lógica para editar un intrumento existente
                await instrumentoService.put(
                  url + "intrumentos",
                  values.id.toString(),
                  values
                );
                setSuccessMessage("Se ha actualizado correctamente.");
              } else {
                // Lógica para agregar un nuevo intrumento
                await instrumentoService.post(url + "intrumento", values);
                setSuccessMessage("Se ha agregado correctamente.");
              }
              getInstrumentos(); // Actualiza los intrumentos
              setTimeout(() => {
                setSuccessMessage(""); // Limpiar el mensaje después de cierto tiempo
                handleClose(); // Cierra el modal
                Swal.fire({
                  icon: "success",
                  title: "¡Éxito!",
                  text: successMessage,
                });
              }, 3000); // Ocultar el mensaje después de 3 segundos
            } catch (error) {
              console.error("Error al realizar la operación:", error);
            }
          }}
        >
          {() => (
            <>
              <Form autoComplete="off" className="form-intrumento">
                <div className="mb-4">
                  <label htmlFor="nombre">Nombre:</label>
                  <Field
                    name="nombre"
                    type="text"
                    placeholder="Nombre"
                    className="form-control my-2"
                  />
                  <ErrorMessage
                    name="nombre"
                    className="error-message"
                    component="div"
                  />

                  {/* Resto de tus campos de formulario */}

                </div>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-success"
                    type="submit"
                    className="custom-button"
                  >
                    Enviar
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalInstrumentos;
