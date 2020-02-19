import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";

import "./App.css";

import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route
                        exact path="/"
                        component={props => <Welcome {...props} />}
                    />
                    <Route
                        path="/signin"
                        component={props => <SignIn {...props} />}
                    />
                    <Route
                        path="/signup"
                        component={props => <SignUp {...props} />}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
