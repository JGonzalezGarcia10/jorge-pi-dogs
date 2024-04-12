import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './CSScomponents/Detail.css';

const Detail = () => {
    const { id } = useParams();
    const [dog, setDog] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchDog = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/dogs/${id}`);
                const data = response.data;
                setDog(data);
                if (data.reference_image_id) {
                    fetchImage(data.reference_image_id);
                }
            } catch (error) {
                console.error('Error fetching dog:', error);
            }
        };

        fetchDog();
    }, [id]);

    const fetchImage = async (referenceImageId) => {
        try {
            const response = await fetch(`https://api.thedogapi.com/v1/images/${referenceImageId}`);
            const data = await response.json();
            setImageUrl(data.url);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    if (!dog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dog-detail">
            <h2>{dog.name}</h2>
            {imageUrl && <img src={imageUrl} alt={dog.name} />}
            <p>ID: {dog.id}</p>
            <p>Height: {dog.height.metric} cm</p>
            <p>Weight: {dog.weight.metric} Kg</p>
            <p>Temperaments: {dog.temperament}</p>
            <p>Life span: {dog.life_span}</p>
            <Link to="/home">
                <button>Regresar a la página de inicio</button>
            </Link>
        </div>
    );
};

export default Detail;