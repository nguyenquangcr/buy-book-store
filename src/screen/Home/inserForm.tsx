import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as utils from '../../utils';
import { useTranslation } from 'react-i18next';

interface IsInserUpdateform {
  dataEdit?: any;
  onError?: (error: Error, payload: Record<string, unknown>) => void;
}

const InserUpdateform: React.FC<IsInserUpdateform> = props => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  //react hook form
  const { register, handleSubmit, watch, setValue } = useForm();
  const watchMovie = watch([
    'id',
    'tenPhim',
    'biDanh',
    'trailer',
    'moTa',
    'hinhAnh',
  ]);

  useEffect(() => {
    try {
      if (props.dataEdit) {
        setValue('id', props.dataEdit.id);
        setValue('tenPhim', props.dataEdit.tenPhim);
        setValue('biDanh', props.dataEdit.biDanh);
        setValue('trailer', props.dataEdit.trailer);
        setValue('moTa', props.dataEdit.moTa);
        setValue('hinhAnh', props.dataEdit.hinhAnh);
      } else {
        setValue('id', utils.random(4));
        setValue('tenPhim', '');
        setValue('biDanh', '');
        setValue('trailer', '');
        setValue('moTa', '');
        setValue('hinhAnh', '');
      }
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'setvaluepropsdataedit',
          args: {},
        });
      }
    }
  }, [props.dataEdit, setValue]);

  const closePoup = () => {
    try {
      utils.closePopup();
      if (props.dataEdit === '') {
        setValue('id', utils.random(4));
        setValue('tenPhim', '');
        setValue('biDanh', '');
        setValue('trailer', '');
        setValue('moTa', '');
        setValue('hinhAnh', '');
      }
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'closePoup',
          args: {},
        });
      }
    }
  };

  const onSubmitFormMovie = () => {
    try {
      if (props.dataEdit) {
        dispatch({
          type: 'EDIT-MOVIE',
          value: watchMovie,
        });
        dispatch({
          type: 'GET-LIST-MOVIE',
        });
      } else {
        dispatch({
          type: 'INSERT-MOVIE',
          value: watchMovie,
        });
        dispatch({
          type: 'GET-LIST-MOVIE',
        });
      }
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'onSubmitFormMovie',
          args: {},
        });
      }
    }
  };

  return (
    <>
      <div className="popup" id="js-popup">
        <div className="popup-body">
          <div className="card">
            <div className="card-header color-text-title">
              {props?.dataEdit
                ? t('home:label_modify_form_title')
                : t('home:label_create_movie')}
              <span className="close">
                <i
                  className="fa fa-times-circle"
                  aria-hidden="true"
                  onClick={closePoup}
                ></i>
              </span>
            </div>
            <form
              className="card-body scrollbar-y-custom"
              id="js-form-insert-update"
              onSubmit={handleSubmit(onSubmitFormMovie)}
            >
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group color-text-title">
                    <label htmlFor="id">
                      {t('home:label_id')}
                      <span className="text-danger" title="title">
                        (*)
                      </span>
                    </label>
                    <input
                      id="id"
                      name="id"
                      type="text"
                      className="form-control"
                      ref={register}
                      readOnly
                      required
                      placeholder={'id'}
                    />
                  </div>
                  <div className="form-group color-text-title">
                    <label htmlFor="tenPhim">
                      {t('home:label_name_movie')}
                      <span className="text-danger" title="title">
                        (*)
                      </span>
                    </label>
                    <input
                      id="tenPhim"
                      name="tenPhim"
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      ref={register}
                      required
                      placeholder={'Ten Phim'}
                    />
                  </div>
                  <div className="form-group color-text-title">
                    <label htmlFor="trailer">
                      {t('home:label_alias_movie')}
                    </label>
                    <input
                      id="trailer"
                      name="biDanh"
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      ref={register}
                      placeholder={'abc'}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group color-text-title">
                    <label htmlFor="tenPhim">
                      Trailer
                      <span className="text-danger" title="title">
                        (*)
                      </span>
                    </label>
                    <input
                      id="tenPhim"
                      name="trailer"
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      ref={register}
                      required
                      placeholder={'abc'}
                    />
                  </div>
                  <div className="form-group color-text-title">
                    <label htmlFor="tenPhim">
                      {t('home:label_image_movie')}
                      <span className="text-danger" title="title">
                        (*)
                      </span>
                    </label>
                    <input
                      id="tenPhim"
                      name="hinhAnh"
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      ref={register}
                      required
                      placeholder={'abc'}
                    />
                  </div>
                  <div className="form-group color-text-title">
                    <label htmlFor="tenPhim">
                      {t('home:label_description')}
                      <span className="text-danger" title="title">
                        (*)
                      </span>
                    </label>
                    <input
                      id="moTa"
                      name="moTa"
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      ref={register}
                      required
                      placeholder={'abc'}
                    />
                  </div>
                </div>
              </div>
              {props.dataEdit ? (
                <div className="form-actions">
                  <button type="submit" className="btn btn-danger">
                    {t('home:label_modify_form_title')}
                  </button>
                </div>
              ) : (
                <div className="form-actions">
                  <button type="submit" className="btn btn-success">
                    {t('home:label_create_movie')}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InserUpdateform;
