import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  getAllTemperaments } from '../redux/actions/index';
import getDogs from '../redux/actions/index';

const Detail = () => {
    const { id } = useParams();
    const [dog, setDog] = useState(null);
    const dispatch = useDispatch();
    const { dogs } = useSelector(state => state.dogs);

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getAllTemperaments());
    }, [dispatch]);

    useEffect(() => {
        const fetchDog = async () => {
            try {
                // Buscar el perro por ID en el array de perros almacenados en el estado global
                const selectedDog = dogs.find(dog => dog.id == id);
                if (selectedDog) {
                    setDog(selectedDog);
                } else {
                    // Si no se encuentra el perro con el ID especificado
                    console.error('No se encontró el perro con el ID especificado');
                }
            } catch (error) {
                console.error('Error fetching dog:', error);
            }
        };

        fetchDog();
    }, [dogs, id]);

    if (!dog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dog-detail">
            <h2>{dog.name}</h2>
            <img className="card-image" src={dog.image ? dog.image : `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} alt={dog.name} />
            <p>ID: {dog.id}</p>
            <p>Weight: {dog.weight.metric ? dog.weight.metric : dog.weight}kg</p>
            <p>Height: {dog.height.metric ? dog.height.metric : dog.height}m</p>
            <p>Temperaments: {Array.isArray(dog.Temperaments) ? dog.Temperaments.map(temp => temp.name).join(', ') : dog.temperament}</p>
            <p>Life span: {dog.life_span}</p>
            <Link to="/home">
                <button>Regresar a la página de inicio</button>
            </Link>
        </div>
    );
};

export default Detail;