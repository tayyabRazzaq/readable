import React from 'react';
import {Link} from 'react-router-dom';

export default () => (
    <div id="notfound">
        <div className="notfound">
            <div className="notfound-404">
                <h1>Oops!</h1>
                <h2>404 - The Page cannot be found</h2>
            </div>
            <Link to="/">GO TO HOMEPAGE</Link>
        </div>
    </div>
);