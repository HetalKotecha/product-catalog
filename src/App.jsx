/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Header from './components/Header';

function App() {
  return (
    <Provider store={store}>
      <>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Products} />
            <Route path="/product-details" component={ProductDetails} />
          </Switch>
        </BrowserRouter>
      </>
    </Provider>
  );
}

export default App;
