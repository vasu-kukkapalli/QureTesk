import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from '../appModules/login';
import Signup from '../appModules/signup';
import Dashboard from '../appModules/dashboard';
import Notfound from '../appModules/notfound';

const ProtectedRoute = ({
    component: Component,
    ...rest
}) => (<Route {...rest} render={props => (
    localStorage.getItem("access_token") ? (<Component {...props} />)
        : window.location.href = '/')} />);

export default () => (
    <Router>
        <Switch>
            <ProtectedRoute path="/me" component={Dashboard} />
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/*" component={Notfound} />
        </Switch>
    </Router>
)
