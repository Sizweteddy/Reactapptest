
import React from 'react';
import {Link} from 'react-router-dom';

const PersonBox = props => {
    return (
        <div className="person">
            <p className="name">{props.name}</p>
            <Link className="link" to={`/person/${props.name}`}>Details</Link>
        </div>
    );
}

export default PersonBox;
