import { useState, useEffect } from "react";
import './species.css'

const Species = () => {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:7070/api/animals")
          .then((response) => response.json())
          .then((animals) => {
                setAnimals(animals);
              });
      }, []);
      console.log(animals);

      return (
        <>
            {animals.map((animal) => {
                return (
                    <div className="animal-card" key={animal.id}>
                        <img src={animal.image} alt={animal.common_name} height="300px" />
                        {animal.common_name}
                    </div>
                )
            })}
        </>
      );
}

export default Species;