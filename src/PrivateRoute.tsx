import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('credentials') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/dang-nhap', state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
