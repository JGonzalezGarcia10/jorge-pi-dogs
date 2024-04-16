
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CSScomponents/Card.css'



const Card = ({ dog }) => {
    const [imageUrl, setImageUrl] = useState('');


    return (
        <div className="card">
            <Link to={`/dogs/${dog.id}`}>
                <h2>{dog.name}</h2>
                <img className="card-image" src={dog.image ? dog.image :`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} alt={dog.name} />
            </Link>
            <p>Temperaments: {Array.isArray(dog.Temperaments) ? dog.Temperaments.map(temp => temp.name).join(', ') : dog.temperament}</p>
            <p>Weight: {dog.weight.metric ? dog.weight.metric : dog.weight}kg</p>
        </div>
    );
};

export default Card;