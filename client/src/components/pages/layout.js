import React from "react";
import Header from '../header';
import Species from "../species";
import { BrowserRouter, Route, Link, Outlet } from "react-router-dom";
import './layout.css';
import header from '../header.jpg';

function Layout() {
  const handleDonate = () => {
    alert('CONGRATS YOU WON AN IPHONE!!!!!!!!!!!')
  }
  return (
    <>
      <nav className="nav-bar">
        <Link to="/" className="link">HOME</Link>
        <Link to="/add-individuals" className="link">ADD INDIVIDUAL</Link>
        <Link to="/add-sighting" className="link">SUBMIT SIGHTINGS</Link>
        <span>
          <button className="donate" onClick={handleDonate} style={{backgroundColor:"red", padding: "10px", borderRadius: "6px", border: "solid 1px white", color: "white"}}>DONATE</button>
        </span>
      </nav>

      <Header image={header} title="Endangered Species"/>
      <Outlet />
      <div className="description">
        We protect wildlife because they inspire us. But we also focus our efforts on those species—like tigers, rhinos, whales and marine turtles—whose protection influences and supports the survival of other species or offers the opportunity to protect whole landscapes or marine areas.
      <Species />
      </div>
      <div className="right-news">

      </div>
    </>
  );
}

export default Layout;