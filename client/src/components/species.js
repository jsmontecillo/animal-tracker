import { useState, useEffect } from "react";
import defaultImg from './default.png';
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
            <h2>Species</h2>
            <div className="container">
                {animals.map((animal) => {
                    let underScoreName = animal.common_name.split(" ").join("_");
                    console.log(underScoreName)
                    return (
                        <div className="animal-card" key={animal.id}>
                            <img src={animal.image || defaultImg} alt={animal.common_name} height="300px" />
                            <div className="full-cap">
                                <a href={`https://en.wikipedia.org/wiki/${underScoreName}`} className="names">{animal.common_name}</a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
      );
}

export default Species;