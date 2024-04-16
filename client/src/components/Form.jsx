import React, { useEffect, useState } from 'react'
import "./CSScomponents/Form.css";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { getAllTemperaments } from '../redux/actions/index';
import { Link } from 'react-router-dom';

export default function Form() {
  const [valor, setValor] = useState({
    image: "",
    name: "",
    height: "",
    weight: "",
    temperamentss: [],
    life_span: "",
  })

  const [temperamentsSeleccionados, setTemperamentsSeleccionados] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch(getAllTemperaments());
}, [dispatch]);

  const allTemperaments = useSelector((state) => state.dogs.allTemperaments)
  const [errors, setErrors] = useState({});


  const handleChange = (event) => {
    const {name, value} = event.target;
    setValor({
      ...valor,
      [name]: value
    })
  }

  const [height, setHeight] = useState({
    min: "",
    max: "",
  })

  useEffect(() => {
    if(height.heightMin !== "" && height.heightMax !== ""){
      const newheight = `${height.heightMin} - ${height.heightMax}`
      setValor({
        ...valor,
        height: newheight
      })
    }
  }, [height]);

  const [weight, setWeight] = useState({
    min: "",
    max: "",
  });

  useEffect(() => {
    if (weight.weightMin !== "" && weight.weightMax !== "") {
      const newweight = `${weight.weightMin} - ${weight.weightMax}`;
      setValor({
        ...valor,
        weight: newweight
      });
    }
  }, [weight]);

  const [life_span, setLife_span] = useState({
    min: "",
    max: "",
  });

  useEffect(() => {
    if (life_span.life_spanMin !== "" && life_span.life_spanMax !== "") {
      const newlife_span = `${life_span.life_spanMin} - ${life_span.life_spanMax} years`;
      setValor({
        ...valor,
        life_span: newlife_span
      });
    }
  }, [life_span]);
  
  useEffect(() =>{
    setValor({
      ...valor,
      temperaments: temperamentsSeleccionados,
    })
  },[temperamentsSeleccionados])

  const handleChangeMinMax = (event, setState) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (event) => {
    const selectedTemperaments = Array.from(event.target.selectedOptions, option => option.value);
    setTemperamentsSeleccionados(prevSelectedTemperaments => [
      ...prevSelectedTemperaments,
      ...selectedTemperaments
    ]);
  };

  const handleSave = async () => {
    try {
      if (validateForm()) { // Llamar a la función de validación
        const response = await axios.post('http://localhost:3001/dogs', valor, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        alert('Datos guardados correctamente');
        // Puedes realizar alguna acción adicional después de guardar los datos, como limpiar el formulario
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar los datos');
    }
  };
  const validateForm = () => {
    let isValid = true;
    let errorMessage = '';
  
    // Validar que todos los campos obligatorios estén completos
    if (!valor.name || !valor.image || !valor.height || !valor.weight || !valor.life_span || temperamentsSeleccionados.length === 0) {
      isValid = false;
      errorMessage += "Todos los campos son obligatorios\n";
    }
  
    // Resto de validaciones...
    
    if (!isValid) {
      alert(errorMessage);
    }
  
    return isValid;
  }

  return (
    <div className='FormContenedorGeneral'>
      <div className='FormBloque1'>
        <h1>¡Añade tu propio perro!</h1>
        <img src="../../public/formDog.png" alt="Perrito sobre el form" width={"120px"}/>
      </div>
      <div className='FormBloque2'>
        <div className='FormInput'>
          <label htmlFor="nombre">Name: </label>
          <input className='inputLargo' id="name" name="name" type="text" placeholder='Maax'onChange={handleChange}/>
        </div>
        <div className='FormInput'>
          <label htmlFor="image">Image(url): </label>
          <input className='inputLargo' type="text" name="image" id="image" placeholder='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fes%2Fsearch%3Fq%3Dperro%2Bgrande&psig=AOvVaw2OtuLj0NDHtgUTOIScNPs6&ust=1709128558072000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDf3JbWy4QDFQAAAAAdAAAAABAb...' onChange={handleChange}/>
        </div>
        <div className='FormInput'>
          <label htmlFor="heighMin">height: </label>
          <div className='contenedorInputChico'>
            <input className="inputChico" type="number" name="heightMin" id="heightaMin" placeholder='Min' onChange={(e) => handleChangeMinMax(e, setHeight)}/>
            <input className="inputChico" type="number" name="heightMax" id="heightMax" placeholder='Max'onChange={(e) => handleChangeMinMax(e, setHeight)}/>
          </div>
        </div>
        <div className='FormInput'>
          <label htmlFor="weightMin">weight: </label>
          <div className='contenedorInputChico'>
            <input className="inputChico" type="number" name="weightMin" id="weightMin" placeholder='Min' onChange={(e) => handleChangeMinMax(e, setWeight)}/>
            <input className="inputChico" type="number" name='weightMax' id='weightMax' placeholder='Max' onChange={(e) => handleChangeMinMax(e, setWeight)}/>
          </div>
        </div>
        <div className='FormInput'>
          <label htmlFor="Life_spanMin">Life_span: </label>
          <div className='contenedorInputChico'>
            <input className="inputChico" type="number" name="life_spanMin" id="life_spanMin" placeholder='Min'onChange={(e) => handleChangeMinMax(e, setLife_span)}/>
            <input className="inputChico" type="number" name='life_spanMax' id='life_spanMax' placeholder='Max'onChange={(e) => handleChangeMinMax(e, setLife_span)}/>
          </div>
        </div>
        <div className='FormInput'>
          <label htmlFor="temperaments">temperaments: </label>
          <select className="FormSelect" name="temperaments" id="temperaments" onChange={handleSelectChange}>
            <option key="default" value="default">-</option>
            {allTemperaments.map((temp, index) => (
              <option key={index} value={temp}>{temp}</option>
            ))}
          </select>
</div>
        <div className='FormContenedorTemperamentos'>
          {temperamentsSeleccionados.map((temp, index) => (
            <span key={index}>{temp}</span>
          ))}
        </div>
      </div>
      <div className='FormBloque3'>
        <button className='ButtonDelete'>Delete</button>
        <button className='ButtonSave' onClick={handleSave}>Save</button>
      </div>
      <Link to = {"/home"}>
              <button>⬅</button>
            </Link>
    </div>
  )
} 
