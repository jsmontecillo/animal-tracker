import React, {useState} from 'react';
import './header.css';

const Header = (props) => {
    const [image, setImage] = useState(props.image);
    const [title, setTitle] = useState(props.title);
    return (
        <div className="header" style={{backgroundImage: `url(${image})`}}>
            <h1>{title}</h1>
        </div>
    )
}

export default Header;