import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import IndexPage from "./views/IndexPage";
import AdmCuentas from "./components/cuentas/AdmCuentas";
import LayoutPage from "./views/LayoutPage";
import 'antd/dist/antd.css'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={IndexPage} exact />
        <Route path="/Inicio" component={LayoutPage} exact />
        <Route path="/AdmCuentas" component={AdmCuentas} exact />  
      </Switch>
    </BrowserRouter>

  );
}

export default App;
