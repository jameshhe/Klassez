import { withRouter, useHistory, BrowserRouter as Router, Route, Switch, Link, } from 'react-router-dom';
import { ClassHomePadge } from './classHomepadge';
import { ClassAddition } from './classAddition';
import { ClassReview } from './classReview';
import { ReviewForm } from './reviewForm';

function App() {
  return (
    <Router>
            <h1>
              <label>
                <Link to="/">Home</Link>
              </label>
              <br></br>
              <label>
                <Link to="/classAddition">Add Class</Link>
              </label>
              </h1>
            <Switch>
              <Route path="/" exact component={ClassHomePadge}/>
              <Route path="/classAddition" exact component={ClassAddition} />
              <Route path="/classReview" exact component={ ClassReview } />
              <Route path="/reviewForm" exact component={ ReviewForm }/>
            </Switch>
    </Router>

  );
}

export default App;
