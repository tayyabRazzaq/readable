import React, {Component} from 'react';
import {getCategories} from '../utils/_DATA';


export default class Page extends Component {
    componentDidMount() {
        getCategories().then(() => {
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