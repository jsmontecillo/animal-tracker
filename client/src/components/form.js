import { useState } from "react";

const Form = (props) => {
  const {} = props;
  const [animal, setAnimal] = useState({
    id: "",
    name: "",
  });

  //create functions that handle the event of the user typing into the form
  const handleNameChange = (event) => {
    const firstname = event.target.value;
    setAnimal((animal) => ({ ...animal, firstname }));
  };

  const handleLastnameChange = (event) => {
    const lastname = event.target.value;
    setAnimal((animal) => ({ ...animal, lastname }));
  };

  //A function to handle the post request
  const postAnimal = (newAnimal) => {
    return fetch("http://localhost:7070/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAnimal),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From the post ", data);
        props.saveAnimal(data);
      });
  };

  //Should have a PUT request - updateAnimal

  const updateAnimal = (existingAnimal) => {
    return fetch(`http://localhost:7070/api/students/${exitingAnimal.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(existingAnimal),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From the put request ", data);
        props.saveAnimal(data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postAnimal(animal);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>ID</label>
        <input
          type="text"
          id="add-user-name"
          placeholder="First Name"
          required
          value={animal.id}
          onChange={handleNameChange}
        />
        <label>Name</label>
        <input
          type="text"
          id="add-user-lastname"
          placeholder="Last Name"
          required
          value={animal.name}
          onChange={handleLastnameChange}
        />
      </fieldset>
      <button type="submit">{!animal.id ? "Add" : "Save"}</button>
    </form>
  );
};

export default Form;
