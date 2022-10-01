import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import frog from './frog.jpg';
import Header from '../header.js';
import './addsighting.css';

const SightingsForm = () => {
  const [sightings, setSightings] = useState([]);
  const [values, setValues] = useState({sighting_date: "", individual: "", location: "", appeared_healthy: false, record_date: "", individual_id: ""});
  const locations = ['https://i.postimg.cc/3whGLXzQ/1257310.jpg', 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/dawn-at-dream-lake-rocky-mountain-national-park-square-format-gregory-ballos.jpg', 'https://i.postimg.cc/NjZtYbBZ/303127a88f88484489fbe783a265902c.jpg', 'https://i.postimg.cc/t4B5VmYm/8a7ddd5cee0f9972da7632dd7e2571ef.jpg', 'https://i.postimg.cc/kGwVhLr0/johnston-atoll-aerial.jpg', 'https://i.postimg.cc/T1hGfs5M/blue-ridge-parkway-nc-sunset-north-carolina-mountains-landscape-dave-allen.jpg', 'https://i.postimg.cc/bdX5WVQR/Laguna-Colorada-Bolivia.jpg', 'https://as2.ftcdn.net/v2/jpg/02/01/14/15/1000_F_201141509_PTNGIvWD8eeqhOD4MaDpbFe8P8AICo0S.jpg', 'https://img-aws.ehowcdn.com/560x560p/photos.demandstudios.com/getty/article/151/31/92849527.jpg', 'https://live.staticflickr.com/4467/36982436300_f6d021041b_c.jpg']

  const getSightings = async () => {
    const response = await fetch('http://localhost:7070/api/sightings');
    const sightings = await response.json();
    setSightings(sightings);
  };

  useEffect(() => {
  // useEffect will run getUsers() every time this component loads, as opposed to just the first time it is rendered.
    getSightings();
  }, [sightings]);

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
    let deleteSightings = [...sightings];
    let deleted = deleteSightings.filter((sight) => sight.id !== Number(ID));
    setSightings(deleted);
    getSightings();
  }

    return (
      <div>
        <nav className="nav-bar">
          <Link to="/" className="link">Show List of Species</Link>
        </nav>
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
        <button type="submit" className="button-83">Submit</button>
      </form>

        <div className="sightings">
          <h3>Recent Sightings</h3>
          <button type="button" onClick={() => {
            let arr = [...sightings];
            let sorted = arr.sort((a,b) => {
            let d1 = new Date(a.sighting_date);
            let d2 = new Date(b.sighting_date);
            return d1.getMonth() - d2.getMonth()}); 
            setSightings(sorted);
          console.log(sightings)}
            } style={{backgroundColor: "white", borderRadius: "6px", border: "solid 1px beige", fontFamily: 'Inter Tight', fontSize: "15px", padding: "5px", color: "#4E3524", fontWeight: "bold"}}>SORT BY DATE</button>
          
          <button type="button" onClick={() => {
            let arr = [...sightings];
            let sorted = arr.sort((a,b) => {
              return  a.individual.localeCompare(b.individual)}); 
            setSightings(sorted);
          console.log(sightings)}
            } style={{backgroundColor: "white", borderRadius: "6px", border: "solid 1px beige", fontFamily: 'Inter Tight', fontSize: "15px", padding: "5px", color: "#4E3524", fontWeight: "bold"}}>A-Z</button>
          <div className="container">
            {sightings.map((sight) => {
              let d = new Date(sight.sighting_date);
              const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December']
              return (
                <div key={sight.id} className="sighting-card">
                  <div className="sight-image">
                    <img src={locations[sight.individual_id-1]} alt={sight.individual} height="300px" />
                  </div>
                  <ul style={{listStyle: "none"}}>
                    <li style={{marginLeft: "-40px", marginTop: "-10px", fontWeight: "bold", fontSize: "20px"}}>{sight.individual}</li>
                    <li style={{marginLeft: "-40px"}}>{sight.location}</li>
                    <li style={{marginLeft: "-40px"}}>{months[d.getMonth()-1]}</li>
                    <li style={{marginLeft: "-40px"}}>Contact: {sight.email}</li>
                  </ul>
                  <br/><button type="button" className="button-83" style={{marginLeft: "100px"}} onClick={() => {onDelete(sight.id)}}>DELETE</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
};

export default SightingsForm;
