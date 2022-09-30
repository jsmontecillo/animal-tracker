import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import Header from '../header.js';
import polar from './polar.jpeg';
import './addindividual.css';

const IndividualsForm = () => {
  const [individuals, setIndividuals] = useState([]);
  const [values, setValues] = useState({nickname: "", species: "", species_id: "", location: "", record_creation: "", image: ""});

  const getIndividuals = async () => {
    const response = await fetch('http://localhost:7070/api/individuals');
    const individuals = await response.json();
    setIndividuals(individuals);
  };

  useEffect(() => {
  // useEffect will run getUsers() every time this component loads, as opposed to just the first time it is rendered.
    getIndividuals();
  }, []);

  console.log(individuals);

  const handleInput = (e) => {
    setValues((preValues) => ({
        ...preValues,
        [e.target.name]: e.target.value
    }))
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newIndividual = values;
    const rawResponse = await fetch('http://localhost:7070/api/individuals', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newIndividual)
    });
    const content = await rawResponse.json();
  
    setIndividuals([...individuals, content]);
    setValues({nickname: "", species: "", species_id: "", location: "", record_creation: "", image: ""});
  }

  const onDelete = async (ID) => {
    let response = await fetch(`http://localhost:7070/api/individuals/${ID}`, {method: "DELETE"})
    await response.json();
    let deleteIndividuals = individuals.filter((i) => i.id !== Number(ID));
    setIndividuals(deleteIndividuals);
    getIndividuals();
    window.location.reload(false);
  }

    return (
      <div>
        <nav className="nav-bar">
          <Link to="/" className="link">Show List of Species</Link>
        </nav>
        <Header image={polar} title="Add An Individual" />
        <form onSubmit={handleSubmit}>
          <fieldset>
          <label>Nickname</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            required
            defaultValue={values.nickname} 
            onChange={handleInput}
          /><br/>
          <label>Species</label>
          <input
            type="text"
            id="individual"
            placeholder="South China Tiger"
            name="individual"
            required
            defaultValue={values.individual} 
            onChange={handleInput}
          /><br/>
          <label>Species ID</label>
          <input
            type="number"
            id="species-id"
            name="species_id"
            required
            defaultValue={values.species_id} 
            onChange={handleInput}
          /><br/>
          <label>Record Creation Date</label>
          <input
            type="date"
            id="creation-date"
            placeholder="Last Name"
            name="record_creation"
            required
            defaultValue={values.record_creation} 
            onChange={handleInput}
          /><br/>
          <label>Image</label>
          <input
            type="text"
            id="individual-image"
            name="image"
            required
            defaultValue={values.image} 
            onChange={handleInput}
          />
        </fieldset>
        <button type="submit" className="button-83">Submit</button>
      </form>
      <div className="individuals">
        <h3>Our Current Individuals</h3>
        <div className="container">
            {individuals.map((i) => {
              return (
                <div key={i.id} className="individual-card">
                  <div className="indiv-image">
                    <img src={i.image} alt={i.nickname} height="300px" />
                  </div>
                  <ul style={{listStyle: "none", marginLeft: "-40px"}}>
                    <li style={{fontSize: "25px"}}>{i.nickname}</li>
                    <li>Species: {i.species}</li>
                  </ul>
                  <br/><button type="button" className="button-83" style={{marginLeft: "100px"}} onClick={() => {onDelete(i.id)}} >DELETE</button>
                </div>
              )
            })}
          </div>
      </div>
      </div>
    );
};

export default IndividualsForm;
