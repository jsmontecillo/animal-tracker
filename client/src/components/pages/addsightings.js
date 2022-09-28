import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import frog from './frog.jpg';
import Header from '../header.js';

const SightingsForm = () => {
  const [sightings, setSightings] = useState([]);
  const [values, setValues] = useState({date: "", individual: "", location: "", healthy: "", recordDate: "", individualID: ""});

  const getSightings = async () => {
    const response = await fetch('http://localhost:7070/api/sightings');
    const sightings = await response.json();
    setSightings(sightings);
  };

  useEffect(() => {
  // useEffect will run getUsers() every time this component loads, as opposed to just the first time it is rendered.
    getSightings();
  }, []);

  console.log(sightings);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSighting = values;
    const rawResponse = await fetch('http://localhost:7070/api/sightings', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSighting)
    });
    const content = await rawResponse.json();
  
    setSightings([...sightings, content]);
    setValues({date: "", individual: "", location: "", healthy: "", recordDate: "", individualID: ""});
  }
    return (
      <div>
        <Header image={frog} title="Have you spotted an individual recently?" />
        <form onSubmit={handleSubmit}>
        <fieldset>
        <label>Sighting Date</label>
        <input
          type="date"
          id="date"
          required
        />
        <label>Individual</label>
        <input
          type="text"
          id="individual"
          placeholder="Name"
          required
        />
        <label>Location</label>
        <input
          type="text"
          id="location"
          placeholder="Rocky Mountains"
          required
        />
        <label>Appeared Healthy?</label>
        <input
          type="radio"
          id="yes"
          name="healthy"
          value="yes"
        /> <label htmlFor="yes">Yes</label>
        <input
          type="radio"
          id="no"
          name="healthy"
          value="no"
        /> <label htmlFor="no">No</label><br/>
        <label>Email</label>
        <input
          type="email"
          id="email"
          required
        />
        <label>Record Creation Date</label>
        <input
          type="date"
          id="record-date"
          placeholder="Last Name"
          required
        />
        <label>Individual ID</label>
        <input
          type="number"
          id="individual-id"
          placeholder="1"
          required
        />
      </fieldset>
      <button type="submit">Submit</button>
        </form>
        <div className="sightings">
          <h3>Recent Sightings</h3>
        </div>
        <small>Main Page</small>
        <Link to="/">Show List of Species</Link>
      </div>
    );
};

export default SightingsForm;
