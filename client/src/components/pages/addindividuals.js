import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import Header from '../header.js';
import polar from './polar.jpeg';

const IndividualsForm = () => {
  const [individuals, setIndividuals] = useState([]);
  const [values, setValues] = useState({nickname: "", species: "", speciesID: "", location: "", recordDate: "", image: ""});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newIndividual= values;
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
    setValues({nickname: "", species: "", speciesID: "", location: "", recordDate: "", image: ""});
  }
    return (
      <div>
        <Header image={polar} title="Add An Individual" />
        <form onSubmit={handleSubmit}>
          <fieldset>
          <label>Nickname</label>
          <input
            type="text"
            id="nickname"
            required
          /><br/>
          <label>Species</label>
          <input
            type="text"
            id="individual"
            placeholder="South China Tiger"
            required
          /><br/>
          <label>Species ID</label>
          <input
            type="number"
            id="species-id"
            required
          /><br/>
          <label>Location</label>
          <input
            type="text"
            id="location"
            placeholder="Rocky Mountains"
            required
          /><br/>
          <label>Record Creation Date</label>
          <input
            type="date"
            id="creation-date"
            placeholder="Last Name"
            required
          /><br/>
          <label>Image</label>
          <input
            type="text"
            id="individual-image"
            required
          />
        </fieldset>
        <button type="submit">Submit</button>
      </form>
      <div className="individuals">
        <h3>Our Current Individuals</h3>
      </div>
        <small>Main Page</small>
        <Link to="/">Show List of Species</Link>
      </div>
    );
};

export default IndividualsForm;
