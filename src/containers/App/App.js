import React, { Component, Suspense } from "react";
import { Route } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import Navbar from "../../components/UI/Navbar/Navbar";
import "./App.css";

const PostData = React.lazy(() =>
  import("../../components/PostingData/PostingData")
);
const Authentication = React.lazy(() =>
  import("../../components/Authentication/Auth")
);
const JobListings = React.lazy(() =>
  import("../../components/JobListings/JobListings")
);
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Suspense fallback={<Spinner />}>
          <Route path="/" exact component={JobListings} />
          <Route path="/:id/postdata/" exact component={PostData} />
          <Route path="/auth/" exact component={Authentication} />
        </Suspense>
      </React.Fragment>
    );
  }
}

export default App;
