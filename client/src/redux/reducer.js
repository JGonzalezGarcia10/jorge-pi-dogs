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
                const { payload: searchResults } = action;
            
                // Aplicar los otros filtros sobre los resultados de búsqueda por nombre
                let filteredResultsAfterSearch = [];
            
                if (state.filteredByOrigin.length > 0) {
                    // Si se ha aplicado el filtro de origen, trabajar sobre los perros filtrados por origen
                    filteredResultsAfterSearch = searchResults.filter((dog) =>
                        state.filteredByOrigin.includes(dog)
                    );
                } else {
                    // Si no se ha aplicado el filtro de origen, trabajar sobre los resultados de búsqueda
                    filteredResultsAfterSearch = [...searchResults];
                }
            
                // Aplicar filtro de temperamento sobre los resultados de búsqueda por nombre
                let filteredResultsAfterTemperaments = [];
            
                if (state.filterTemperament !== "default") {
                    filteredResultsAfterTemperaments = filteredResultsAfterSearch.filter((dog) => {
                        if (dog.Temperaments) {
                            return dog.Temperaments.some((temp) => temp.name === state.filterTemperament);
                        } else if (dog.temperament) {
                            return dog.temperament.includes(state.filterTemperament);
                        } else {
                            return false;
                        }
                    });
                } else {
                    filteredResultsAfterTemperaments = [...filteredResultsAfterSearch];
                }
            
                return {
                    ...state,
                    searchResults: searchResults,
                    filteredResults: filteredResultsAfterTemperaments,
                };     
            


            case FILTER_BY_TEMPERAMENTS:
                const { payload } = action;
                let filteredResultsByTemperaments = [];
            
                if (state.searchResults.length > 0) {
                    // Si hay resultados de búsqueda, trabajar sobre esos resultados
                    filteredResultsByTemperaments = state.searchResults.filter((dog) => {
                        if (dog.Temperaments) {
                            return dog.Temperaments.some((temp) => temp.name === payload);
                        } else if (dog.temperament) {
                            return dog.temperament.includes(payload);
                        } else {
                            return false; // Por si acaso, manejo de caso donde no hay información de temperamento
                        }
                    });
                } else {
                    // Si no hay resultados de búsqueda, trabajar sobre los perros filtrados por origen o todos los perros
                    if (state.filteredByOrigin.length > 0) {
                        // Si se ha aplicado el filtro de origen, trabajar sobre los perros filtrados por origen
                        filteredResultsByTemperaments = state.filteredByOrigin.filter((dog) => {
                            if (dog.Temperaments) {
                                return dog.Temperaments.some((temp) => temp.name === payload);
                            } else if (dog.temperament) {
                                return dog.temperament.includes(payload);
                            } else {
                                return false; // Por si acaso, manejo de caso donde no hay información de temperamento
                            }
                        });
                    } else {
                        // Si no se ha aplicado el filtro de origen, trabajar sobre todos los perros
                        filteredResultsByTemperaments = state.dogs.filter((dog) => {
                            if (dog.Temperaments) {
                                return dog.Temperaments.some((temp) => temp.name === payload);
                            } else if (dog.temperament) {
                                return dog.temperament.includes(payload);
                            } else {
                                return false; // Por si acaso, manejo de caso donde no hay información de temperamento
                            }
                        });
                    }
                }
            
                return {
                    ...state,
                    filteredResults: filteredResultsByTemperaments,
                };

    case FILTER_ORIGIN:
    
        let filteredDogsByOrigin = [];

    if (state.searchResults.length > 0) {
        // Si hay resultados de búsqueda, trabajamos con ese array
        if (action.payload === "All") {
            // Si el payload es "All", devuelve todos los perros filtrados
            filteredDogsByOrigin = [...state.searchResults];
        } else if (action.payload === "api") {
            // Filtrar los perros de la búsqueda que tienen la propiedad "createdAt" undefined (probablemente los de la API)
            filteredDogsByOrigin = state.searchResults.filter(dog => dog.createdAt === undefined);
        } else if (action.payload === "db") {
            // Filtrar los perros de la búsqueda que tienen la propiedad "createdAt" definida (probablemente los de la base de datos)
            filteredDogsByOrigin = state.searchResults.filter(dog => dog.createdAt !== undefined);
        }
    } else {
        // Si no hay resultados de búsqueda, trabajamos con el array original de perros
        if (action.payload === "All") {
            // Si el payload es "All", devuelve todos los perros
            filteredDogsByOrigin = [...state.dogs];
        } else if (action.payload === "api") {
            // Si el payload es "api", devuelve los perros que tienen la propiedad "createdAt" undefined (probablemente los de la API)
            filteredDogsByOrigin = state.dogs.filter(dog => dog.createdAt === undefined);
        } else if (action.payload === "db") {
            // Si el payload es "db", devuelve los perros que tienen la propiedad "createdAt" definida (probablemente los de la base de datos)
            filteredDogsByOrigin = state.dogs.filter(dog => dog.createdAt !== undefined);
        }
    }
    
        // Aplicar filtro de temperamento sobre los perros filtrados por origen
        let filteredResults = [];
    
        if (state.filterTemperament !== "default") {
            filteredResults = filteredDogsByOrigin.filter((dog) => {
                if (dog.Temperaments) {
                    return dog.Temperaments.some((temp) => temp.name === state.filterTemperament);
                } else if (dog.temperament) {
                    return dog.temperament.includes(state.filterTemperament);
                } else {
                    return false; // Por si acaso, manejo de caso donde no hay información de temperamento
                }
            });
        } else {
            filteredResults = filteredDogsByOrigin;
        }
    
        return {
            ...state,
            filteredByOrigin: filteredDogsByOrigin,
            filteredResults: filteredResults,
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
                            const hasFilteredResultsWeight = state.filteredResults.length > 0;
                            const hasSearchResultsWeight = state.searchResults.length > 0;
                        
                            let resultsToSortWeight = [];
                        
                            if (hasFilteredResultsWeight) {
                            resultsToSortWeight = [...state.filteredResults];
                            } else if (hasSearchResultsWeight) {
                            resultsToSortWeight = [...state.searchResults];
                            } else {
                            resultsToSortWeight = [...state.dogs];
                            }
                        
                            // Sort the results based on the payload
                            if (action.payload === "Ascending Weight") {
                                resultsToSortWeight.sort((a, b) => {
                                    const pesoA = parseInt(a.weight.metric || a.weight.split(" - ")[1]);
                                    const pesoB = parseInt(b.weight.metric || b.weight.split(" - ")[1]);
                                    return pesoA - pesoB;
                                });
                            } else if (action.payload === "Descending Weight") {
                                resultsToSortWeight.sort((a, b) => {
                                    const pesoA = parseInt(a.weight.metric || a.weight.split(" - ")[1]);
                                    const pesoB = parseInt(b.weight.metric || b.weight.split(" - ")[1]);
                                    return pesoB - pesoA;
                                });
                            }
                        
                            // Update the state based on the scenario
                            if (hasFilteredResultsWeight) {
                            return {
                                ...state,
                                filteredResults: resultsToSortWeight,
                            };
                            } else if (hasSearchResultsWeight) {
                            return {
                                ...state,
                                searchResults: resultsToSortWeight,
                            };
                            } else {
                            return {
                                ...state,
                                filteredResults: resultsToSortWeight,
                                searchResults: resultsToSortWeight,
                            };
                            }

                    

            default:
                return { ...state };
            }
        
    
};