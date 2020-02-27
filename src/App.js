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
// import Calendar from "./pages/Calendar";
// import Insights from "./pages/Insights";

import BottomNavigation from "./navigation/BottomNavigaton";
class App extends React.Component {
    state = {
        user: null,
        userPending: true,
        cycles: [],
        currentCycle: [],
        today: new Date(),
        journals: []
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

    getCycles = data => {
        this.setState({ cycles: data });
    };

    getCurrentCycle = data => {
        this.setState({ currentCycle: data });
    };

    getJournals = data => {
        this.setState({ journals: data });
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

            API.cycles()
                .then(data => {
                    if (data.error) throw Error(data.error);
                    this.getCycles(data);
                })
                .catch(error => alert(error));

            API.currentCycle()
                .then(data => {
                    if (data.error) throw Error(data.error);
                    this.getCurrentCycle(data);
                })
                .catch(error => alert(error));

            API.journals()
                .then(data => {
                    if (data.error) throw Error(data.error);
                    this.getJournals(data);
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
                            <Cycle
                                {...props}
                                user={this.state.user}
                                getCurrentCycle={this.getCurrentCycle}
                                currentCycle={this.state.currentCycle}
                                journals={this.state.journals}
                                estimatedCycleLength={28}
                            />
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
                {this.state.user !== null && <BottomNavigation />}
            </div>
        );
    }
}

export default withRouter(App);
