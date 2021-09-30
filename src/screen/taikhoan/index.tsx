import React, { useContext } from 'react';
import Header from '../../components/header';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { apiContext } from '../../redux/reducer/root.reducer';

const ThongTinTaiKhoan: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { account } = useContext(apiContext);

  return (
    <div>
      <Header />
      {account ? (
        <div className="container">
          <div className="tk-body">
            <div className="row">
              <div className="col-6">
                <img className="tk-image" src={account?.hinhAnh} alt="" />
              </div>
              <div className="tk-infor col-6">
                <div>
                  {t('infor:label_infor_name')} : {account.hoTen}
                </div>
                <div>
                  {t('infor:label_infor_dayofbirth')} : {account.ngaySinh}
                </div>
                <div>
                  {t('infor:label_infor_location')}: {account.diaChi}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ThongTinTaiKhoan;
