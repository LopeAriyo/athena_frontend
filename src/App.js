import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import API from "./API";

import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cycle from "./pages/Cycle";

class App extends React.Component {
    state = {
        user: null
    };

    signUp = () => {
        //Things go in here
    };

    signIn = data => {
        this.setState({ user: data });
        localStorage.token = data.token;
    };

    signOut = () => {
        this.setState({ user: null });
        localStorage.removeItem("token");
    };

    componentDidMount() {
        if (localStorage.token) {
            API.validate()
                .then(data => {
                    if (data.error) throw Error(data.error);
                    this.signIn(data);
                    this.props.history.push("/");
                })
                .catch(error => alert(error));
        }
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    {this.state.user === null ? (
                        <Route
                            exact
                            path="/"
                            component={props => <Welcome {...props} />}
                        />
                    ) : (
                        <Route
                            exact
                            path="/"
                            component={props => (
                                <Home {...props} user={this.state.user} />
                            )}
                        />
                    )}
                    <Route
                        path="/signup"
                        component={props => (
                            <SignUp {...props} signUp={this.signUp} />
                        )}
                    />
                    <Route
                        path="/signin"
                        component={props => (
                            <SignIn {...props} signIn={this.signIn} />
                        )}
                    />
                    <Route
                        path="/profile"
                        component={props => (
                            <Profile
                                {...props}
                                user={this.state.user}
                                signOut={this.signOut}
                            />
                        )}
                    />
                    <Route
                        path="/cycle"
                        component={props => (
                            <Cycle {...props} user={this.state.user} />
                        )}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
