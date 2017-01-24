import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
export default class TopBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <IndexLink className="btn btn-default" to={'/'}
                               role="button">Home</IndexLink>
                </div>
                <Link className="btn btn-default" to={'/create/'}
                      role="button">Create Post</Link>
                <Link className="btn btn-default" to={'/login/'}
                      role="button">Login</Link>
            </nav>
        )
    }
};
