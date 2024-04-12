import { GET_DOGS, FILTER_BY_TEMPERAMENTS, POST_DOG, GET_ALL_TEMPERAMENTS, SEARCH_DOGS_BY_NAME, GET_DOG_BY_ID, FILTER_BY_ORIGIN} from './types';
import axios from 'axios';
import { getDogsById, postDog } from '../../Utils/apiFunctions';

export function searchDogssByName(name) {
return async function(dispatch) {
    try {
    const response = await axios.get(`http://localhost:3001/dogs/name?name=${name}`);
    dispatch({
        type: SEARCH_DOGS_BY_NAME,
        payload: response.data
    });
    } catch (error) {
    console.error('Error searching dogs:', error);
    }
};
}

export default function getDogs() {
    return async function (dispatch){
        var result = await axios.get('http://localhost:3001/dogs'); 
        return dispatch({ 
            type: GET_DOGS, 
            payload: result.data
        })                                                                                                 
    }
}


export const getAllTemperaments = () => {
    return async (dispatch) => {
        try {
            var result = await axios.get("http://localhost:3001/temperaments");

            return dispatch({
                type: GET_ALL_TEMPERAMENTS,
                payload: result.data,
            })
        } catch (error) {
            console.log('server error!');
        }
    };
};


export const filterByTemperaments = (temperament) => {
    return {
        type: FILTER_BY_TEMPERAMENTS,
        payload: temperament,

        
    }
}

export const filterByOrigin = (origin) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload: origin,

        
    }
}
export const postRace = (form) => {
    console.log(form);
    return async (dispatch) =>{
        try {
            const newDog = await postDog(form);
            return dispatch({
                type: POST_DOG,
                payload: newDog,
            })
        } catch (error) {
            console.log('server error!');
        }
    };
}





export const setDogById = (id) => {
    return async (dispatch) => {
        try {
            if(id === "reset"){ 
                return dispatch({
                    type: GET_DOG_BY_ID,
                    payload: {},
                })
            }else{
                const dogs = await getDogsById(id);
        
                return dispatch({
                    type: GET_DOG_BY_ID,
                    payload: dogs,
                })}
            
        } catch (error) {
            console.log('server error!');
        }
    };
};