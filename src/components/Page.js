import React, {Component} from 'react';
import {getCategories} from '../utils/_DATA';


export default class Page extends Component {
    componentDidMount() {
        getCategories().then(response => {
            debugger;
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