import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import frog from './frog.jpg';
import Header from '../header.js';

const SightingsForm = () => {
  const [sightings, setSightings] = useState([]);
  const [values, setValues] = useState({sighting_date: "", individual: "", location: "", appeared_healthy: false, record_date: "", individual_id: ""});

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

  const handleInput = (e) => {
    setValues((preValues) => ({
        ...preValues,
        [e.target.name]: e.target.value
    }))
};

console.log(values);

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
    console.log(sightings);
    setValues({sighting_date: "", individual: "", location: "", appeared_healthy: "", record_date: "", individual_id: ""});
  }

  const onDelete = async (ID) => {
    let response = await fetch(`http://localhost:7070/api/sightings/${ID}`, {method: "DELETE"})
    await response.json();
    let deleteSightings = sightings.filter((sight) => sight.id !== Number(ID));
    setSightings(deleteSightings);
    getSightings();
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
          name="sighting_date"
          required
          defaultValue={values.sighting_date} 
          onChange={handleInput}
        />
        <label>Individual</label>
        <input
          type="text"
          id="individual"
          placeholder="Name"
          name="individual"
          required
          defaultValue={values.individual} 
          onChange={handleInput}
        />
        <label>Location</label>
        <input
          type="text"
          id="location"
          placeholder="Rocky Mountains"
          name="location"
          required
          defaultValue={values.location}
          onChange={handleInput}
        />
        <label>Appeared Healthy?</label>
        <input
          type="radio"
          id="true"
          name="appeared_healthy"
          defaultValue={true}
          onChange={handleInput}
        /> <label htmlFor="true">Yes</label>
        <input
          type="radio"
          id="false"
          name="appeared_healthy"
          defaultValue={values.appeared_healthy}
          onChange={handleInput}
        /> <label htmlFor="false">No</label><br/>
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          defaultValue={values.email}
          onChange={handleInput}
        />
        <label>Record Creation Date</label>
        <input
          type="date"
          id="record-date"
          placeholder="Last Name"
          name="record_date"
          required
          defaultValue={values.record_date}
          onChange={handleInput}
        />
        <label>Individual ID</label>
        <input
          type="number"
          id="individual-id"
          name="individual_id"
          placeholder="1"
          required
          defaultValue={values.individual_id}
          onChange={handleInput}
        />
      </fieldset>
      <button type="submit">Submit</button>
        </form>
        <div className="sightings">
          <h3>Recent Sightings</h3>
          {sightings.map((sight) => {
            return (
              <div key={sight.id}>
              {sight.individual}: {sight.location}, {sight.sighting_date}, {sight.individual_id}. {sight.record_date}, Contact: {sight.email}
              <br/><button type="button" onClick={() => {onDelete(sight.id)}}>DELETE</button>
            </div>
            )
          })}
        </div>
        <small>Main Page</small>
        <Link to="/">Show List of Species</Link>
      </div>
    );
};

export default SightingsForm;
