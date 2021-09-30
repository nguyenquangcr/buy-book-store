import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import './style.scss';

//i18next
import LanguageSelector from '../../LanguageSelector';
import { useTranslation } from 'react-i18next';
import { apiContext } from '../../redux/reducer/root.reducer';

interface IsSignin {
  onError?: (error: Error, payload: Record<string, unknown>) => void;
}

const Signin: React.FC<IsSignin> = props => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const [userSuccess, setUserSuccess] = useState('');
  const listUser = useSelector((state: any) => state.userSlice.listUser);
  //react hook form
  const { register, handleSubmit, watch } = useForm();
  const watchUserName = watch(['userName', 'password']);

  const { setAccountLogin } = useContext(apiContext);
  

  useEffect(() => {
    try {
      listUser &&
        listUser.forEach((user: any) => {
          if (user.taiKhoan === watchUserName.userName) {
            if (user.matKhau === watchUserName.password) {
              return setUserSuccess(user);
            } else {
              return setUserSuccess('');
            }
          }
        });
    } catch (error) {
      //
    }
  }, [listUser, watchUserName.password, watchUserName.userName]);

  const onSubmitFormSign = (data: any) => {
    try {
      if (data) {
        if (userSuccess) {
          setAccountLogin(userSuccess);
          localStorage.setItem('credentials', JSON.stringify(userSuccess));
          alert('Login Sucess');
          history.push('/home');
        } else {
          alert('Error Password or UserName');
        }
      }
    } catch (error) {
      //
    }
  };

  return (
    <>
      <div className="sign-in-body">
        <LanguageSelector />
        <h1 className="sign-in">{t('signin:label_sign_title')}</h1>
        <form
          className="form-group form-style"
          onSubmit={handleSubmit(onSubmitFormSign)}
        >
          <div>
            <label className="popup-label">
              {t('signin:label_sign_username')}
            </label>
            <input
              className="form-control input-label"
              type="text"
              name="userName"
              placeholder="User Name"
              autoComplete="off"
              ref={register}
            />
          </div>
          <div>
            <label className="popup-label">
              {t('signin:label_sign_password')}
            </label>
            <input
              className="form-control input-label"
              type="password"
              name="password"
              placeholder="Password"
              ref={register}
            />
          </div>
          <div>
            <button className="btn btn-success btn-style" type="submit">
              {t('signin:label_sign_login')}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signin;
