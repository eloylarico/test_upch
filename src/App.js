import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import ItemsRows from "./components/itemsTable";
import FilterBox from "./components/filter";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function App() {
  const [query, setQuery] = useState("users?limit=20");
  const [dataUser, setDataUser] = useState([]);
  const { loading, data } = useFetch(query);
  const [dataDetail, setDataDetail] = useState({});
  const [formUser, setFormUser] = useState({
    id: "",
    firstName: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    age: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCallback = (data) => {
    setDataDetail(data);
    setFormUser({
      id: data.id,
      firstName: data.firstName,
      gender: data.gender,
      address: data.address,
      phone: data.phone,
      email: data.email,
      age: data.age,
    });
  };
  const handleChangeInput = ({ target: { value, name } }) => {
    setFormUser({
      ...formUser,
      [name]: value,
    });
  };
  const saveDataUser = () => {
    const data = dataUser.map((item) =>
      item.id === formUser.id ? { ...item, ...formUser } : item
    );
    setDataUser(data);
    setShow(false);
  };
  const handleFilterCallback = (keyData) => {
    setQuery(keyData);
  };
  const deleteItem = () => {
    MySwal.fire({
      title: "Esta seguro Eliminar?",
      text: "No podras recuperarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDataUser((dataUser) =>
          dataUser.filter((item) => item.id !== dataDetail.id)
        );
        Swal.fire({
          title: "Eliminado!",
          text: "Este Item se elimino con exito.",
          icon: "success",
        });
      }
    });
  };
  useEffect(() => {
    setDataUser(data?.users);
  }, [data]);
  return (
    <>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a href="/#" className="navbar-brand mx-auto">
              <img
                src="https://logo.clearbit.com/clearbit.com"
                alt="Logo de la empresa"
                className="d-inline-block align-text-top"
                height="30"
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>

        <div className="container  pt-5">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="dt-title ">
                <h3>Listado de usuarios</h3>
              </div>
            </div>
            <FilterBox handleEvent={handleFilterCallback} />
            <div className="col-sm-12 pt-4">
              <div className="card border rounded-2 ">
                <div className="card-header py-3">
                  <div className="d-flex justify-content-start align-items-center">
                    <button
                      className="btn btn-sm btn-outline-primary px-4 me-2 editar"
                      onClick={handleShow}
                    >
                      <i className="bi bi-pencil"></i> Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger px-4 me-2"
                      id="confirmDelete"
                      onClick={deleteItem}
                    >
                      <i className="bi bi-trash3"></i> Eliminar
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="dt-example">
                    {loading && "Cargando..."}
                    <table
                      className="table table-hover table-light"
                      id="example"
                    >
                      <thead>
                        <tr>
                          <th scope="col">
                            <i className="bi bi-check-lg"></i>
                          </th>
                          <th scope="col"></th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Genero</th>
                          <th scope="col">Dirección</th>
                          <th scope="col">Teléfono</th>

                          <th scope="col">Correo electrónico</th>

                          <th scope="col">Edad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataUser &&
                          dataUser.length > 0 &&
                          dataUser.map((item, index) => (
                            <ItemsRows
                              data={item}
                              key={index}
                              parentCallback={handleCallback}
                            />
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="editForm p-3" className="row">
            <div className="mb-3 col-sm-12 col-md-6">
              <label htmlFor="editNombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                id="editNombre"
                defaultValue={dataDetail?.firstName}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3 col-sm-12 col-md-6">
              <label htmlFor="editGenero" className="form-label">
                Género
              </label>
              <select
                className="form-select"
                name="gender"
                id="editGenero"
                defaultValue={dataDetail?.gender}
                onChange={handleChangeInput}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
            <div className="mb-3 col-sm-12 col-md-6">
              <label htmlFor="editDireccion" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                name="address"
                className="form-control"
                id="editDireccion"
                defaultValue={dataDetail?.address?.address}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3 col-sm-12 col-md-6">
              <label htmlFor="editTelefono" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                name="phone"
                className="form-control"
                id="editTelefono"
                defaultValue={dataDetail?.phone}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3 col-sm-12 col-md-6">
              <label htmlFor="editCorreo" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="editCorreo"
                defaultValue={dataDetail?.email}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3 col-sm-12 col-md-6">
              <label htmlFor="editEdad" className="form-label">
                Edad
              </label>
              <input
                type="text"
                name="age"
                className="form-control"
                id="editEdad"
                defaultValue={dataDetail?.age}
                onChange={handleChangeInput}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={saveDataUser}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
