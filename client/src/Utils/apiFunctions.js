import axios from "axios";

export const getAllDogs = async () => {
    try {
    let response = await axios.get("http://localhost:3001/dogs");
    return response.data;
    } catch (error) {
    console.log("no se encontraron perros");
    }
};

export const getDogsById = async (id) => {
    try {
    let response = await axios.get(`http://localhost:3001/dogs/${id}`);
    return response.data;
    } catch (error) {
    console.log("no se encontraron perros");
    }
};

export const getAllTemperaments = async () => {
    try {
    let response = await axios.get("http://localhost:3001/temperaments");
    return response.data;
    } catch (error) {
    console.log("no se encontraron temperamentos");
    }
};

export const getDogsByName = async (name) => {
    try {
    let response = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
    );
    return response.data;
    } catch (error) {
    alert("no se encontraron perros");
    return await getAllDogs();
    }
};

export const postDog = async (form) => {
    try {
    await axios.post("http://localhost:3001/dogs", form);
    } catch (error) {
    alert("El perro ya exsiste");
    }
};

export const deleteDog = async (id) => {
    try {
    await axios.delete(`http://localhost:3001/dogs/${id}`);
    
    } catch (error) {
      alert("No se pudo borrar el perro :)");
    }
};

export const updateDog = async (form, id) => {
    try {
    await axios.put(`http://localhost:3001/dogs/${id}`, form);
    } catch (error) {
    alert("No se pudo modificar el perro :(");
    }
};