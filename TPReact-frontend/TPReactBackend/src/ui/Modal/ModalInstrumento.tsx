import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Instrumento from "../../types/Instrumento"; // Importa la interfaz Intrumento
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleModal } from "../../redux/slices/modal";
import Swal from "sweetalert2"; // Importa SweetAlert2
import InstrumentoService from "../../services/InstrumentoService";

const ModalInstrumentos: React.FC<{ getInstrumentos: () => void }> = ({
  getInstrumentos,
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
        denominacion: ""
    },
  };

  const modal = useAppSelector((state) => state.modal.modal);
  const elementActive = useAppSelector((state) => state.table.setElementActive);
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

                  <label htmlFor="marca">Marca:</label>
                  <Field
                    name="marca"
                    type="text"
                    placeholder="marca"
                    className="form-control my-2"
                  />
                  <ErrorMessage
                    name="marca"
                    className="error-message"
                    component="div"
                  />

                  <label htmlFor="modelo">Modelo:</label>
                  <Field
                    name="Modelo"
                    type="text"
                    placeholder="modelo"
                    className="form-control my-2"
                  />
                  <ErrorMessage
                    name="modelo"
                    className="error-message"
                    component="div"
                  />
                  <label htmlFor="descripcion">Descripcion:</label>
                  <Field
                    name="descripcion"
                    type="text"
                    placeholder="descripcion"
                    className="form-control my-2"
                  />
                  <ErrorMessage
                    name="descripcion"
                    className="error-message"
                    component="div"
                  />
                  <label htmlFor="imagen">Imagen:</label>
                  <Field
                    name="imagen"
                    type="text"
                    placeholder="imagen"
                    className="form-control my-2"
                  />
                  <ErrorMessage
                    name="imagen"
                    className="error-message"
                    component="div"
                  />
                  <label htmlFor="precio">Precio:</label>
                  <Field
                    name="precio"
                    type="text"
                    placeholder="precio"
                    className="form-control my-2"
                  />
                  <ErrorMessage
                    name="precio"
                    className="error-message"
                    component="div"
                  />
                  <label htmlFor="costo_envio">Costo de Envio:</label>
                  <Field
                    name="costo_envio"
                    type="text"
                    placeholder="costo_envio"
                    className="form-control my-2"
                  />
                  <ErrorMessage
                    name="costo_envio"
                    className="error-message"
                    component="div"
                  />
                  <label htmlFor="cantidad_Vendida">Cantidad Vendida:</label>
                  <Field
                    name="cantidad_Vendida"
                    type="text"
                    placeholder="cantidad_Vendida"
                    className="form-control my-2"
                  />
                  <ErrorMessage
                    name="cantidad_Vendida"
                    className="error-message"
                    component="div"
                  />
                  {/* Agrega otros campos necesarios para el intrumento */}
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
