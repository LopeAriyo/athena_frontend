import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";

import "./App.css";

import API from "./adapters/API";

import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cycle from "./pages/Cycle";

import NavigationBar from "./components/NavigationBar";

class App extends React.Component {
    state = {
        user: null,
        userPending: true
    };

    signUp = () => {
        //Things go in here
    };

    signIn = data => {
        this.setState({ user: data, userPending: false });
        localStorage.token = data.token;
    };

    signOut = () => {
        this.setState({ user: null });
        localStorage.removeItem("token");
        this.props.history.push("/");
    };

    componentDidMount() {
        if (localStorage.token) {
            this.setState({ userPending: true });

            API.validate()
                .then(data => {
                    if (data.error) throw Error(data.error);
                    this.signIn(data);
                    // this.props.history.push("/");
                })
                .catch(error => alert(error));
        }
    }

    render() {
        if (this.state.userPending) return <div>please wait</div>;
        return (
            <div className="App">
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={props => <Welcome {...props} />}
                    />
                    <Route
                        exact
                        path="/home"
                        component={props => (
                            <Home
                                {...props}
                                // signOut={this.signOut}
                                user={this.state.user}
                            />
                        )}
                    />
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
                        path="/cycle"
                        component={props => (
                            <Cycle {...props} user={this.state.user} />
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
                </Switch>
                {this.state.user !== null && <NavigationBar />}
            </div>
        );
    }
}

export default withRouter(App);
