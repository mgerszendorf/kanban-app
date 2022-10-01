import React from "react";
import "./assets/styles/App.scss";
import Root from "./pages/Root";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Root />
      </Provider>
    </div>
  );
}

export default App;
