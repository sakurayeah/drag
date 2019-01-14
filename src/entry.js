import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/index';
import ResizeDrag from './components/resizeDrag';
import SplitPaneDrag from './components/splitPaneDrag';
import TagDrag from './components/tagDrag';
import '../index.html';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/tag" component={TagDrag} />
      <Route exact path="/resize" component={ResizeDrag} />
      <Route exact path="/splitpane" component={SplitPaneDrag} />
    </Switch>
  </HashRouter>,
  document.getElementById('root'),
);