import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Master extends Component {
    render() {
        return (
            <div className="container">
                <Link className="btn btn-primary" to='/posts/new' >
                    Add a Post
                </Link>
                Master
            </div>
        )
    }
}

export default Master;