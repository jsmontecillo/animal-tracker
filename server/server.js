const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');
const { restart } = require('nodemon');

const app = express();

const PORT = 7070;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  res.json({ message: 'Hello from My template ExpressJS' });
});

// create the get request
app.get('/api/species', cors(), async (req, res) => {
  try {
    const { rows: species } = await db.query('SELECT * FROM species');
    res.send(species);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.get('/api/individuals', cors(), async (req, res) => {
  try {
    const { rows: individuals } = await db.query('SELECT * FROM individuals');
    res.send(individuals);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.get('/api/sightings', cors(), async (req, res) => {
  try {
    const { rows: sightings } = await db.query('SELECT * FROM sightings');
    res.send(sightings);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

//join table here
app.get('/api/animals', cors(), async (req, res) => {
  try {
    const allRows = await db.query('SELECT sightings.id, individuals.nickname, species.common_name, species.scientific_name, species.living_in_wild, species.conservation_status_code, sightings.location, sightings.appeared_healthy, sightings.email, individuals.image FROM sightings JOIN individuals ON sightings.individual_id = individuals.id JOIN species on species.id = individuals.species_id');
    res.send(allRows.rows);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request
//sighting_date: "", individual: "", location: "", 
//appeared_healthy: "", record_date: "", individual_id: ""
app.post('/api/sightings', cors(), async (req, res) => {
  const newSight = {
    sighting_date: req.body.sighting_date,
    individual: req.body.individual,
    location: req.body.location,
    appeared_healthy: req.body.appeared_healthy,
    email: req.body.email,
    record_date: req.body.record_date,
    individual_id: req.body.individual_id
  };
  console.log([newSight.sighting_date]);
  try {
    const result = await db.query(
    'INSERT INTO sightings(sighting_date, individual, location, appeared_healthy, email, record_creation, individual_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [newSight.sighting_date, newSight.individual, newSight.location, newSight.appeared_healthy, newSight.email, newSight.record_date, newSight.individual_id]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch(e) {
    return res.status(400).json({e});
  }

});

//nickname: "", species: "", species_id: "", location: "", record_creation: "", image: ""
app.post('/api/individuals', cors(), async (req, res) => {
  const newIndividual = {
    nickname: req.body.nickname,
    species: req.body.species,
    species_id: req.body.species_id,
    location: req.body.location,
    record_creation: req.body.record_creation,
    image: req.body.image
  };
  console.log([newSight.sighting_date]);
  try {
    const result = await db.query(
    'INSERT INTO sightings(nickname, species, species_id, location, record_creation, image) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [newIndividual.nickname, newIndividual.species, newIndividual.species_id, newIndividual.location, newIndividual.record_creation, newIndividual.image]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch(e) {
    return res.status(400).json({e});
  }

});

//put request - update an animal/sighting
app.put('/api/animals/:animalId', cors(), async (req,res) => {
  //this will be the id that i want to find in db
  const animalId = req.params.animalId
  const updatedAnimal = {
    id: req.body.id,
    name: req.body.name
  }
  //UPDATE students SET lastname = "something" where id = "16";
  const query = `UPDATE animals SET name=$1 WHERE id=${animalId} RETURNING *`;
  const values = [updatedAnimal.name];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch(e){
    console.log(e);
    return res.status(400).json({e})
  }
})

app.delete(`/api/sightings/:id`, cors(), async(req,res) => {
  const animalId = req.params.id;
  await db.query('DELETE FROM sightings WHERE id=$1', [animalId]);
  res.status(200).end();
});

app.delete(`/api/individuals/:id`, cors(), async(req,res) => {
  const animalId = req.params.id;
  await db.query('DELETE FROM individuals WHERE id=$1', [animalId]);
  res.status(200).end();
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
