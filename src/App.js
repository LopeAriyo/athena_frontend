import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { Spinner } from "reactstrap";

import "./css/App.css";

import API from "./adapters/API";

import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cycle from "./pages/Cycle";
// import Calendar from "./pages/Calendar";
// import Insights from "./pages/Insights";

import Navigation from "./navigation/Navigation";
class App extends React.Component {
    state = {
        user: null,
        userPending: false,
        cycles: [],
        currentCycle: [],
        today: new Date(),
        journals: []
    };

    signIn = data => {
        this.setState({ user: data, userPending: false });
        localStorage.token = data.token;
    };

    signUp = () => {
        this.setState({ userPending: false });
    };

    signOut = () => {
        this.setState({ user: null });
        localStorage.removeItem("token");
        this.props.history.push("/");
    };

    createNewCycle = (estimatedCycleLength, estimatedPeriodLength) => {
        const newCycle = {
            active_cycle: true,
            estimated_cycle_length: estimatedCycleLength, // get this.state version of this
            cycle_length: 1,
            estimated_period_length: estimatedPeriodLength, // get this.state version of this
            period_length: 1
        };

        API.postCycle(newCycle).then(data => {
            if (data.error) throw Error(data.error);
            this.setState({ currentCycle: data });
        });
    };

    getCycles = data => {
        this.setState({ cycles: data });
    };

    getCurrentCycle = data => {
        this.setState({ currentCycle: data });
    };

    patchPeriodInCurrentCycle = updatedPeriodLength => {
        API.patchCurrentCycle({
            period_length: updatedPeriodLength
        });
    };

    patchCurrentCycleThenCreate = (
        updatedCycleLength,
        estimatedCycleLength,
        estimatedPeriodLength
    ) => {
        API.patchCurrentCycle({
            active_cycle: false,
            cycle_length: updatedCycleLength
        });

        this.createNewCycle(estimatedCycleLength, estimatedPeriodLength);
    };

    patchLastCycleThenUpdate = () => {
        API.patchLastCycle({
            active_cycle: true
        }).then(data => {
            if (data.error) throw Error(data.error);
            this.setState({ currentCycle: data });
        });
    };

    deletePeriodInCurrentCycle = updatedPeriodLength => {
        let deletePeriod = window.confirm(
            `Are you sure you want to delete today's period entry?`
        );

        if (deletePeriod !== true) {
            return;
        } else {
            this.patchPeriodInCurrentCycle(updatedPeriodLength);
        }
    };

    deleteCurrentCycleThenPatchLast = id => {
        let deleteCycle = window.confirm(
            `Are you sure you want to delete your current cycle?`
        );

        if (deleteCycle !== true) {
            return;
        } else {
            API.destroyCycle(id);
            this.patchLastCycleThenUpdate();
        }
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
        return (
            <div className="App">
                {this.state.user !== null && <Navigation />}
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={props => <Welcome {...props} />}
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

                    {this.state.userPending ? (
                        <div>
                            <Spinner type="grow" color="primary" />
                            <Spinner type="grow" color="secondary" />
                            <Spinner type="grow" color="success" />
                            <div>Content Loading</div>
                        </div>
                    ) : (
                        <main className="routes">
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
                                path="/cycle"
                                component={props => (
                                    <Cycle
                                        {...props}
                                        user={this.state.user}
                                        getCurrentCycle={this.getCurrentCycle}
                                        createNewCycle={this.createNewCycle}
                                        currentCycle={this.state.currentCycle}
                                        patchPeriod={
                                            this.patchPeriodInCurrentCycle
                                        }
                                        patchCurrentCycleThenCreate={
                                            this.patchCurrentCycleThenCreate
                                        }
                                        deletePeriod={
                                            this.deletePeriodInCurrentCycle
                                        }
                                        deleteCurrentCycleThenPatchLast={
                                            this.deleteCurrentCycleThenPatchLast
                                        }
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
                        </main>
                    )}
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
