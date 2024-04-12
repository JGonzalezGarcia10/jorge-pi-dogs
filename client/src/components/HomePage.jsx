import getDogs, { filterByOrigin, filterByTemperaments, getAllTemperaments } from '../redux/actions/index';
import Cards from './Cards';
import React, {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import { getAllDogs } from '../Utils/apiFunctions';


const HomePage = () => {

const dispatch = useDispatch();
const { dogs} = useSelector(state => state.dogs);
const filteredResults = useSelector((state) => state.dogs.filteredResults) || [];
const searchResults = useSelector((state) => state.dogs.searchResults) || [];
const Alltemperaments = useSelector(state => state.dogs.allTemperaments)
const [temperament, setTemperament] = useState('');
const toShow = filteredResults.length > 0 ? filteredResults : searchResults.length > 0 ? searchResults : dogs
const [origin, setOrigin] = useState('');

const [filteredTemperaments, setFilteredTemperaments] = useState([]);




useEffect(() => { 
    dispatch(getDogs());
    dispatch(getAllTemperaments());
}, [dispatch]);

// useEffect(() => {
//         if (filteredResults.length === 0) {
//         // setOrder('')
//         setTemperament('')
//         // setOrderPopulation('')
//         }
//     }, [filteredResults]);

    const handleTempFilter = (e) => {
        const selectedValue = e.target.value;
        dispatch(filterByTemperaments(selectedValue));
        console.log(selectedValue);
        setTemperament(selectedValue);
        
    };

    const handleOriginFilter = (e) => {
        const originValue = e.target.value
        dispatch(filterByOrigin(originValue));
        setOrigin(originValue)
      };







return (
    <div className="homepage-container">
        <SearchBar />
        <div className="select-container">

            <select value ={temperament} onChange={handleTempFilter}>
                <option value='Select Temperament...' key='defaultOption'>Select Temperament...</option>
                <option value="All">All Dogs</option>
                    {Alltemperaments && Alltemperaments.map((el, index) => {
                    return <option value={el} key={index}>{el}</option>
                })}
            </select> 
            <select value={origin} onChange={handleOriginFilter}>
            <option value="All">All dogs</option>
            <option value="api">DB Dogs</option>
            <option value="db">API Dogs</option>
          </select>
        </div>
        
        {/* <select className="select-box" onChange={filterOrigin}>
            <option value="ALL">ALL</option>
            <option value="DB">DB</option>
            <option value="API">API</option>
        </select> */}
        <Cards dogs={toShow} />
    </div>
);
};

export default HomePage;


/* eslint-disable react-hooks/exhaustive-deps */
// import { useDispatch, useSelector } from 'react-redux';
// import { CountriesCards } from "../../Components/Cards/CountriesCards"
// import { useEffect, useState } from "react";
// import { filterByContinent, filterByPopulation, getAllCountries, sortCountries } from "../../Redux/actions";
// import './Home.css'
// import { Navbar } from '../../Components/NavBar/Navbar';


// export const HomePage = () => {
//   const [continent, setContinent] = useState('');
//   const [order, setOrder] = useState('');
//   const [orderPopulation, setOrderPopulation] = useState('');

//   const dispatch = useDispatch();
//   const countries = useSelector((state) => state.countries.allCountries) || [];
//   const searchResults = useSelector((state) => state.countries.searchResults) || [];
//   const filteredResults = useSelector((state) => state.countries.filteredResults) || [];
//   const toShow = filteredResults.length > 0 ? filteredResults : searchResults.length > 0 ? searchResults : countries 

//   useEffect(() => {
//     dispatch(getAllCountries());
//   }, [dispatch]);

//   useEffect(() => {
//     if (filteredResults.length === 0) {
//       setOrder('')
//       setContinent('')
//       setOrderPopulation('')
//     }
//   }, [filteredResults]);
  
//   const handleResetFilters = () => {
//     dispatch(filterByContinent('All'));
//     dispatch(sortCountries('All'));
//     setOrder('Ascending')
//     setContinent('All')
//     setOrderPopulation('Ascending')
//   }; 

//   const handleContinentFilter = (e) => {
//     dispatch(filterByContinent(e.target.value));
//     setContinent(e.target.value)
//   };
//   const handleSortCountries = (e) => {
//     dispatch(sortCountries(e.target.value));
//     setOrder(e.target.value)
//   };
//   const handleSortPopulation = (e) => {
//     dispatch(filterByPopulation(e.target.value));
//     setOrderPopulation(e.target.value)
//   };
//   return (
//     <div className="HomeBody">
//       <Navbar />
//       <div className='FiltersContainer'>

//           <select value={continent} onChange={handleContinentFilter}>
//             <optgroup label='Filter by Continent:'>
//             <option value="All">All Continents</option>
//             <option value="Antarctic">Antarctic</option>
//             <option value="Americas">America</option>
//             <option value="Asia">Asia</option>
//             <option value="Africa">Africa</option>
//             <option value="Oceania">Oceania</option>
//             <option value="Europe">Europe</option>
//             </optgroup>
//           </select>
//           <select value={order} onChange={handleSortCountries}>
//             <optgroup label='Order by Name:'>
//             <option value="Ascending">Ascending</option>
//             <option value="Descending">Descending</option>
//             </optgroup>
//           </select> <select value={orderPopulation} onChange={handleSortPopulation}>
//             <optgroup label='Order by Population:'>
//             <option value="Ascending">Ascending</option>
//             <option value="Descending">Descending</option>
//             </optgroup>
//           </select>
//          <button  className='ResetFiltersButton' onClick={handleResetFilters}>Reset Filters</button>
//       </div>
//       <div className="HomeContainer">
//         <CountriesCards countries={toShow}/>
//       </div>
//     </div>
//   );
// }