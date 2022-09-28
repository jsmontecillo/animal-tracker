import { useState, useEffect } from "react";
import Form from "./form";

function Students() {
  const [animals, setAnimals] = useState([]);
  const [editAnimalId, setEditAnimalId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:7070/api/students")
      .then((response) => response.json())
      .then((animals) => {
            setStudents(animals);
          });
  }, []);

  const addAnimal = (newAnimal) => {
    //console.log(newStudent);
    //postStudent(newStudent);
    setAnimals((animals) => [...animals, newAnimal]);
  };

  //function to control the update in the parent (student component)

  const updateAnimal = (savedAnimal) => {
    //this line is only closes the form
    setAnimals((animals) => {
      const newArrayAnimals = [];
      for(let animal of animals) {
        if(animal.id === savedAnimal.id){
          newArrayAnimals.push(savedAnimal);
        } else {
          newArrayAnimals.push(animal);
        }
      }
      return newArrayAnimals
    })
  }

  const onEdit = (animal) => {
    let editingID = animal.id;
    setEditAnimalId(editingID);
  }

  return (
    <div className="students">
      <h2> List of Students </h2>
      <ul>
        {animals.map((animal) => {
          if(animal.id === editAnimalId){
            return <Form initialAnimal={animal} saveAnimal={updateAnimal}/>
          } else {
            <li key={animal.id}>
            {" "}
            {animal.name}
            <button type="button" onClick={onEdit(animal)}>EDIT</button>
          </li>
          }}
        )}
      </ul>
      <Form saveAnimal={editAnimalId}/>
    </div>
  );
}

export default Students;
