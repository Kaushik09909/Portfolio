import React, { Component } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import Profile from './components/Profile';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ResumePlaceHolder from './components/ResumePlaceholder';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/input">
              <ResumePlaceHolder />
            </Route>
            <Route path="/">
              <TopBar />
              <Profile />
              <Footer />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;