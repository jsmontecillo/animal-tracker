import React from "react";
import Header from '../header';
import Species from "../species";
import { BrowserRouter, Route, Link, Outlet } from "react-router-dom";
import './layout.css';

function Layout() {
  return (
    <>
        <Header />
        <nav>
        <ul>
            <li>
            <Link to="/">HOME</Link>
            </li>
            <li>
            <Link to="/add-individuals">ADD INDIVIDUAL</Link>
            </li>
            <li>
            <Link to="/add-sighting">SUBMIT SIGHTINGS</Link>
            </li>
        </ul>
        </nav>
        <Outlet />
        <p>We protect wildlife because they inspire us. But we also focus our efforts on those species—like tigers, rhinos, whales and marine turtles—whose protection influences and supports the survival of other species or offers the opportunity to protect whole landscapes or marine areas.</p>
        <Species />
    </>
  );
}

export default Layout;