import './App.css';
import Login from "./Components/Login/Login";
import Header from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import AddProducts from "./Components/AddProducts/AddProducts";
import EditProducts from "./Components/EditProducts/EditProducts";
function App() {
  const user = useSelector(state => state.login.user);
  return (
    <div className="App">
      {user ? (
          <>
            <Header/>
            <Switch>
              <Route exact path={"/"} component={HomePage}/>
              <Route exact path={"/add-products"} component={AddProducts}/>
              <Route exact path={"/edit-product"} component={EditProducts}/>
            </Switch>
          </>

      ):(
          <Login/>
      )}
    </div>
  );
}

export default App;
