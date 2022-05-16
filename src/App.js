import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./components/homePage";
import EditBook from "./components/editBook"

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Switch>
          <Route path={'/'} component={Homepage} exact />
          <Route path={"/editBook/:book_id"} component={EditBook} exact />
        </Switch>
      </BrowserRouter>


    </div>
  );
}

export default App;
