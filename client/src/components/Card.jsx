// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './CSScomponents/Card.css'



// const Card = ({ dog }) => {
//     const [imageUrl, setImageUrl] = useState('');

//     useEffect(() => {
//         const fetchImage = async () => {
//             try {
//                 const response = await fetch(`https://api.thedogapi.com/v1/images/${dog.reference_image_id}`);
//                 const data = await response.json();
//                 setImageUrl(data.url);
//             } catch (error) {
//                 console.error('Error fetching image:', error);
//             }
//         };

//         if (dog.reference_image_id) {
//             fetchImage();
//         }
//     }, [dog.reference_image_id]);



//     return (
//         <div className="card">
//             <Link to={`/dogs/${dog.id}`}>
//                 <h2>{dog.name}</h2>
//                 {imageUrl && <img className="card-image" src={imageUrl} alt={dog.name} />}
//             </Link>
//             <p>Temperaments: {dog.temperament}</p>
//             <p>Weight: {dog.weight.metric} Kg</p>
//         </div>
//     );
// };

// export default Card;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CSScomponents/Card.css'



const Card = ({ dog }) => {
    const [imageUrl, setImageUrl] = useState('');

    // useEffect(() => {
    //     const fetchImage = async () => {
    //         try {
    //             const response = await fetch(`https://api.thedogapi.com/v1/images/${dog.reference_image_id}`);
    //             const data = await response.json();
    //             setImageUrl(data.url);
    //         } catch (error) {
    //             console.error('Error fetching image:', error);
    //         }
    //     };

    //     if (dog.reference_image_id) {
    //         fetchImage();
    //     }
    // }, [dog.reference_image_id]);



    return (
        <div className="card">
            <Link to={`/dogs/${dog.id}`}>
                <h2>{dog.name}</h2>
                <img className="card-image" src={dog.image?.url || `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} alt={dog.name} />
            </Link>
            <p>Temperaments: {dog.temperament}</p>
            <p>Weight: {dog.weight.metric} Kg</p>
        </div>
    );
};

export default Card;

