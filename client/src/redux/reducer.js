import { GET_DOGS, SEARCH_DOGS_BY_NAME, FILTER_BY_TEMPERAMENTS, GET_DOG_BY_ID,FILTER_BY_ORIGIN, GET_ALL_TEMPERAMENTS   } from '../redux/actions/types'

const initialState = {
    dogs: [],
    allDogsCopy: [],
    filterTemperament: "default",
    allTemperaments:[],
    selectedTemperament: null,
    searchResults: [],
    filteredByOrigin: [],
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
            }
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                allTemperaments: action.payload
            }
        case GET_DOG_BY_ID:
            return {
                ...state,
                getDogById: action.payload,
            }
        case SEARCH_DOGS_BY_NAME:
            return {
                ...state,
                dogs: action.payload,
            }            


            case FILTER_BY_TEMPERAMENTS:
                // PREGUNTAR AL PONER FILTRO Y DESPUES BUSCAR ME BUSCA TODOS Y NO LOS DEL FILTRO
                let filteredDogs = [];
                if (action.payload === "All") {
                filteredDogs = state.dogs;
                } else {
                if (state.searchResults.length > 0) {
                    filteredDogs = state.searchResults.filter((dog) => {
                        // Verifica si dog.temperament existe y luego verifica si contiene action.payload
                        return dog.temperament && dog.temperament.includes(action.payload);
                    });
                } else {
                    filteredDogs = state.dogs.filter((dog) => {
                        // Verifica si dog.temperament existe y luego verifica si contiene action.payload
                        return dog.temperament && dog.temperament.includes(action.payload);
                    });
                }
                }
                
                return {
                ...state,
                filteredResults: filteredDogs,
                };

                case FILTER_BY_ORIGIN:
                    // PREGUNTAR AL PONER FILTRO Y DESPUES BUSCAR ME BUSCA TODOS Y NO LOS DEL FILTRO
                    let filteredByOrigin = [];
                        if (action.payload === "All") {
                            // Si el payload es "All", devuelve todos los perros
                            filteredByOrigin = state.dogs;
                        } else if (action.payload === "api") {
                            // Si el payload es "api", devuelve los perros que tienen la propiedad "createdInDb"
                            filteredByOrigin = state.dogs.filter(dog => dog?.createdInDb !== undefined);
                        } else if (action.payload === "db") {
                            // Si el payload es "db", devuelve los perros que NO tienen la propiedad "createdInDb"
                            filteredByOrigin = state.dogs.filter(dog => dog?.createdInDb === undefined);
                        }
                    
                    return {
                    ...state,
                    filteredResults: filteredByOrigin,
                    };

            default:
                return { ...state };
            }
        
    
};