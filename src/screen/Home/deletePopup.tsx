import React from 'react';
import { useDispatch } from 'react-redux';
import * as utils from '../../utils';
import { useTranslation } from 'react-i18next';

interface IDeletePopup {
  dataDelete?: any;
  onError?: (error: Error, payload: Record<string, unknown>) => void;
}

const DeletePopup: React.FC<IDeletePopup> = props => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const onClickClosePopup = (e: any) => {
    try {
      e.preventDefault();
      utils.closePopupDelete();
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'onClickClosePopup',
          args: { e },
        });
      }
    }
  };
  const onClickDeleteMovie = (e: any) => {
    try {
      e.preventDefault();
      dispatch({
        type: 'DELETE-MOVIE',
        value: props?.dataDelete?.id,
      });
      dispatch({
        type: 'GET-LIST-MOVIE',
      });
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'onClickDeleteMovie',
          args: { e },
        });
      }
    }
  };

  return (
    <>
      <div className="popup" id="js-popup-delete">
        <div className="popup-body">
          <div className="card">
            <div className="card-header">
              <i className="icon-note" /> {t('home:label_delete_form_submit')}
              <span className="close">
                <i
                  className="fa fa-times-circle"
                  aria-hidden="true"
                  onClick={utils.closePopupDelete}
                ></i>
              </span>
            </div>
            <form
              className="card-body scrollbar-y-custom"
              id="js-form-insert-update"
              onSubmit={e => console.log(e)}
            >
              <div className="form-group color-text-title">
                <span >
                  {t('home:label_delete_form_note')} {props.dataDelete.tenPhim}{' '}
                  ?
                </span>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group" style={{ textAlign: 'end' }}>
                    <button
                      type="submit"
                      className="btn btn-danger"
                      onClick={onClickDeleteMovie}
                    >
                      {t('home:label_delete_form_submit')}
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={onClickClosePopup}
                    >
                      {t('home:label_delete_form_cancel')}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePopup;
