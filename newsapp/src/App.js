import './App.css';

import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pageSize = 100

  const [progress, setProgress] = useState(0)

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          color='#f0e68c'
          height={4}
          progress={progress}
          // onLoaderFinished={() => setProgress(0)}
        />
        <Switch>
          <Route exact path="/">
            <News setProgress={setProgress} key="general" pageSize={pageSize} country="in" category='general' />
          </Route>
          <Route exact path="/business">
            <News setProgress={setProgress} key="business" pageSize={pageSize} country="in" category='business' />
          </Route>
          <Route exact path="/science">
            <News setProgress={setProgress} key="science" pageSize={pageSize} country="in" category='science' />
          </Route>
          <Route exact path="/sports">
            <News setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category='sports' />
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category='entertainment' />
          </Route>
          <Route exact path="/health">
            <News setProgress={setProgress} key="health" pageSize={pageSize} country="in" category='health' />
          </Route>
          <Route exact path="/technology">
            <News setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category='technology' />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
