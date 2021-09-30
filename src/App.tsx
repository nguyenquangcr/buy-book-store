import { useEffect, Suspense, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ThongTinTaiKhoan from './screen/taikhoan';
import Home from './screen/Home';
import PrivateRoute from './PrivateRoute';
import { Provider } from './redux/reducer/root.reducer';
import Signin from './screen/signin';

function App() {
  const [account, setAccount] = useState('');
  const credential = localStorage.getItem('credentials');
  const dispatch = useDispatch();

  const setAccountLogin = (item:any) => {
    setAccount(item);
  }

  useEffect(() => {
    const ListUser = () => {
      dispatch({
        type: 'GET-LIST-USER',
      });
    };
    const getCredential = () => {
      if (credential) {
        setAccount(JSON.parse(credential));
      }
    };
    ListUser();
    getCredential();
  }, [credential, dispatch]);




  return (
    <Provider value={{ account, setAccountLogin }}>
      <div className="body-page">
        <Suspense fallback={null}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/dang-nhap" component={Signin}></Route>
              <PrivateRoute exact path="/home" component={Home}></PrivateRoute>
              <PrivateRoute
                exact
                path="/thong-tin-tai-khoan/:id"
                component={ThongTinTaiKhoan}
              ></PrivateRoute>
              <Route exact path="/" component={Signin}>
                {credential ? (
                  <Redirect to="/home"></Redirect>
                ) : (
                  <Redirect to="/dang-nhap"></Redirect>
                )}
              </Route>
            </Switch>
          </BrowserRouter>
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
