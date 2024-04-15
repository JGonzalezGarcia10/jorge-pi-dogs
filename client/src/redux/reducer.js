import { GET_DOGS, SEARCH_DOGS_BY_NAME, FILTER_BY_TEMPERAMENTS, GET_DOG_BY_ID, FILTER_ORIGIN, GET_ALL_TEMPERAMENTS, SORT_DOGS, SORT_BY_WEIGHT   } from '../redux/actions/types'

const initialState = {
    dogs: [],
    allDogsCopy: [],
    filterTemperament: "default",
    allTemperaments:[],
    selectedTemperament: null,
    searchResults: [],
    filteredByOrigin: [],
    filteredResults: []
    
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
                searchResults: action.payload, // Actualizar los resultados de búsqueda con los perros encontrados por nombre
            };          


            case FILTER_BY_TEMPERAMENTS:
                let filteredDogs = [];
                // Verificar si hay resultados de búsqueda activos
                if (state.searchResults.length > 0) {
                    // Si hay resultados de búsqueda, filtrar dentro de ellos
                    filteredDogs = state.searchResults.filter((dog) => {
                        // Verifica si dog.temperament existe y luego verifica si contiene action.payload
                        return dog.temperament && dog.temperament.includes(action.payload);
                    });
                } else {
                    // Si no hay resultados de búsqueda, filtrar dentro de todos los perros
                    filteredDogs = state.dogs.filter((dog) => {
                        // Verifica si dog.temperament existe y luego verifica si contiene action.payload
                        return dog.temperament && dog.temperament.includes(action.payload);
                    });
                }
                return {
                    ...state,
                    filteredResults: filteredDogs,
                };

                case FILTER_ORIGIN:
                    // PREGUNTAR AL PONER FILTRO Y DESPUES BUSCAR ME BUSCA TODOS Y NO LOS DEL FILTRO
                    let filteredByOrigin = [];
                        if (action.payload === "All") {
                            // Si el payload es "All", devuelve todos los perros
                            filteredByOrigin = state.dogs;
                        } else if (action.payload === "api") {
                            // Si el payload es "api", devuelve los perros que tienen la propiedad "createdInDb"
                            filteredByOrigin = state.dogs.filter(dog => dog?.createdAt === undefined);
                        } else if (action.payload === "db") {
                            // Si el payload es "db", devuelve los perros que NO tienen la propiedad "createdInDb"
                            filteredByOrigin = state.dogs.filter(dog => dog?.createdAt !== undefined);
                        }
                    
                    return {
                    ...state,
                    filteredResults: filteredByOrigin,
                    };

                case SORT_DOGS:
                    const hasFilteredResults = state.filteredResults.length > 0;
                    const hasSearchResults = state.searchResults.length > 0;

                    let resultsToSort = [];

                    if (hasFilteredResults) {
                        resultsToSort = [...state.filteredResults];
                    } else if (hasSearchResults) {
                        resultsToSort = [...state.searchResults];
                    } else {
                        resultsToSort = [...state.dogs];
                    }

                    // Sort the results based on the payload
                    if (action.payload === "Ascending") {
                        resultsToSort.sort((a, b) => a.name.localeCompare(b.name));
                    } else if (action.payload === "Descending") {
                        resultsToSort.sort((a, b) => b.name.localeCompare(a.name));
                    }

                    // Update the state based on the scenario
                    if (hasFilteredResults) {
                        return {
                        ...state,
                        filteredResults: resultsToSort,
                        };
                    } else if (hasSearchResults) {
                        return {
                        ...state,
                        searchResults: resultsToSort,
                        };
                    } else {
                        return {
                        ...state,
                        filteredResults: resultsToSort,
                        searchResults: resultsToSort,
                        };
                    }

                    case SORT_BY_WEIGHT:
                    const hasFilteredResults2 = state.filteredResults.length > 0;
                    const hasSearchResults2 = state.searchResults.length > 0;

                    let resultsToSort2 = [];

                    if (hasFilteredResults2) {
                        resultsToSort2 = [...state.filteredResults];
                    } else if (hasSearchResults2) {
                        resultsToSort2 = [...state.searchResults];
                    } else {
                        resultsToSort2 = [...state.dogs];
                    }

                    // Sort the results based on the payload
                    if (action.payload === "Ascending") {
                        resultsToSort2.sort((a, b) => a.weight.localeCompare(b.weight)) ;
                    } else if (action.payload === "Descending") {
                        resultsToSort2.sort((a, b) => b.weight.localeCompare(a.wheight));
                    }

                    // Update the state based on the scenario
                    if (hasFilteredResults2) {
                        return {
                        ...state,
                        filteredResults: resultsToSort2,
                        };
                    } else if (hasSearchResults2) {
                        return {
                        ...state,
                        searchResults: resultsToSort2,
                        };
                    } else {
                        return {
                        ...state,
                        filteredResults: resultsToSort2,
                        searchResults: resultsToSort2,
                        };
                    }

                    

            default:
                return { ...state };
            }
        
    
};