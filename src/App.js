import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

//Components:
import StyledApp from './StyledApp';
import Header from './Components/Header/Header';


//Pages
import About from './Components/Pages/About';
import Generator from './Components/Pages/Generator';


function App() {

  document.title = 'DQ SQL'
  return (
    <StyledApp>
      <Router>
      <Header />
          <Switch>
            <Route path='/generator'><Generator /></Route>
            <Route exact path=''><About /></Route>
          </Switch>
      </Router>
    </StyledApp>
  );
}

export default App;
