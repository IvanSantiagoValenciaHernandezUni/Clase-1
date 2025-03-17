import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const App = () => {
  // Estado para manejar los datos
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: "", edad: "" });

  // Función para crear un nuevo documento
  const crearUsuario = async () => {
    try {
      const docRef = await addDoc(collection(db, "usuarios"), {
        nombre: nuevoUsuario.nombre,
        edad: parseInt(nuevoUsuario.edad),
      });
      console.log("Usuario agregado con ID:", docRef.id);
      leerUsuarios(); // Actualiza la lista después de agregar
    } catch (e) {
      console.error("Error al agregar el documento:", e);
    }
  };

  // Función para leer documentos
  const leerUsuarios = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      const usuariosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsuarios(usuariosData);
    } catch (e) {
      console.error("Error al leer los documentos:", e);
    }
  };

  // Función para actualizar un documento
  const actualizarUsuario = async (id, nuevoNombre) => {
    try {
      const docRef = doc(db, "usuarios", id);
      await updateDoc(docRef, { nombre: nuevoNombre });
      console.log("Usuario actualizado");
      leerUsuarios(); // Actualiza la lista después de actualizar
    } catch (e) {
      console.error("Error al actualizar el documento:", e);
    }
  };

  // Función para eliminar un documento
  const eliminarUsuario = async (id) => {
    try {
      const docRef = doc(db, "usuarios", id);
      await deleteDoc(docRef);
      console.log("Usuario eliminado");
      leerUsuarios(); // Actualiza la lista después de eliminar
    } catch (e) {
      console.error("Error al eliminar el documento:", e);
    }
  };

  // Cargar los datos al montar el componente
  useEffect(() => {
    leerUsuarios();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>CRUD con Firebase y React</h1>

      {/* Formulario para agregar un nuevo usuario */}
      <div>
        <h2>Agregar Usuario</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Edad"
          value={nuevoUsuario.edad}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, edad: e.target.value })}
        />
        <button onClick={crearUsuario}>Crear</button>
      </div>

      {/* Lista de usuarios */}
      <h2>Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nombre} (Edad: {usuario.edad})
            <button onClick={() => actualizarUsuario(usuario.id, "Nombre Actualizado")}>
              Actualizar
            </button>
            <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
