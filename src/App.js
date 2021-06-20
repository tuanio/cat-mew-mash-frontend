// import logo from './logo.svg';
import Home from './components/Home/Home';
import Leaderboard from './components/Leaderboard/Leaderboard';
// import backendRoute from './helper';
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Home />}></Route>
        <Route exact path="/leaderboard" component={Leaderboard}></Route>
      </Switch>
    </Router>
  );
}

export default App;
