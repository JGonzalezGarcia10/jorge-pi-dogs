import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDogssByName, getDogs } from "../redux/actions/index";
import './CSScomponents/SearchBar.css';
import { Link } from "react-router-dom";

export default function SearchBar(props) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchDogssByName(name));
    setName("");
  };


  return (
    <div className="search-container">
      <div className="sbcontainer">
        <input
          className="sbinput"
          onChange={handleChange}
          type="text"
          placeholder="Introduce un nombre"
          value={name}
        />
        <button className="sbbot" onClick={handleSubmit} type="submit">
          Buscar
        </button>
        
        <Link to = {"/form"}>
              <button>Create dog</button>
            </Link>
      </div>
    </div>
  );
}