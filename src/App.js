import { Switch, Route, BrowserRouter } from "react-router-dom";
import IndexPage from "./views/IndexPage";
import LayoutPage from "./views/LayoutPage";
import 'antd/dist/antd.css'
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={IndexPage} exact />
        <Route path="/inicio" component={LayoutPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
