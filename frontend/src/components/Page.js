import React, {Component} from 'react';
import {getCategories} from '../utils/_DATA';


export default class Page extends Component {
    componentDidMount() {
        // eslint-disable-next-line
        getCategories().then(response => {
            debugger; // eslint-disable-line
        });
    }
    
    render() {
        return (
            <div>
                Hello World
            </div>
        );
    }
}