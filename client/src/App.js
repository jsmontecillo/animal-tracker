import "./App.css";
import Header from './components/header';
import Species from "./components/species";

function App() {
  return (
    <div className="App">
      <Header />
      <p>We protect wildlife because they inspire us. But we also focus our efforts on those species—like tigers, rhinos, whales and marine turtles—whose protection influences and supports the survival of other species or offers the opportunity to protect whole landscapes or marine areas.</p>
      <Species />
    </div>
  );
}

export default App;
