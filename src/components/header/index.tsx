import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiContext } from '../../redux/reducer/root.reducer';
import logo from '../../assets/images/logo.png';

interface IHeader {
  onError?: (error: Error, payload: Record<string, unknown>) => void;
}

const Header: React.FC<IHeader> = props => {
  const { t, i18n } = useTranslation();
  const { account, setAccountLogin } = useContext(apiContext);

  const clearItem = () => {
    try {
      localStorage.removeItem('credentials');
      setAccountLogin(null);
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'clearItem',
          args: {},
        });
      }
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <span className="navbar-brand">
          <img src={logo} alt="logo" style={{ width: '70px' }} />
        </span>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink exact to="/home" className={'label-header-text'}>
                {t('header:label_header_home')}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to={`/thong-tin-tai-khoan/${account?.id}`}
                className={'label-header-text'}
              >
                {t('header:label_header_infor')}
              </NavLink>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            {account ? (
              <div style={{ textAlign: 'end' }}>
                <span className="label-header-text-account">
                  {t('header:label_header_hello')} {account.hoTen}
                </span>
                <button
                  style={{ marginLeft: '8px' }}
                  className="btn btn-danger btn-style"
                  onClick={() => clearItem()}
                >
                  {t('header:label_header_logout')}
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'end' }}>
                <NavLink exact to="/dang-nhap">
                  <button
                    style={{ marginLeft: '8px' }}
                    className="btn btn-success btn-style"
                  >
                    {t('header:label_header_login')}
                  </button>
                </NavLink>
              </div>
            )}
          </form>
        </div>
      </nav>
    </>
  );
};

export default Header;
