import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/header';
import './style.scss';
import * as utils from '../../utils';
import InserUpdateform from './inserForm';
import DeletePopup from './deletePopup';
import Search from '../../components/search';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

interface IHome {
  onError?: (error: Error, payload: Record<string, unknown>) => void;
}

const Home: React.FC<IHome> = props => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const listMovie = useSelector((state: any) => state.movieSlice.listMvoie);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviePerPage, setmoviePerPage] = useState(6);
  const [pageNumbers, setPageNumber] = useState<any>([]);
  const indexOfLastTodo = currentPage * moviePerPage;
  const indexOfFirstTodo = indexOfLastTodo - moviePerPage;
  const currentMovie = listMovie.slice(indexOfFirstTodo, indexOfLastTodo);
  const [movieEdit, setMovieEdit] = useState('');
  const [movieDelete, setMovieDelete] = useState('');
  const [arraySuggestion, setArraySuggestion] = useState<any>(null);

  useEffect(() => {
    try {
      let arr = [];
      for (let i = 1; i <= Math.ceil(listMovie.length / moviePerPage); i++) {
        arr.push(i);
      }
      setPageNumber(arr);
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'setvaluepageNumbers',
          args: {},
        });
      }
    }
  }, [listMovie, moviePerPage]);

  useEffect(() => {
    try {
      setCurrentPage(1);
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'setCurrentPage',
          args: {},
        });
      }
    }
  }, [moviePerPage]);

  useEffect(() => {
    try {
      dispatch({
        type: 'GET-LIST-MOVIE',
      });
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'dispatchgetlistmovie',
          args: {},
        });
      }
    }
  }, [dispatch]);

  const handleClick = (event: any) => {
    try {
      setCurrentPage(event.target.value);
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'handleClick',
          args: { event },
        });
      }
    }
  };

  const renderMovie = currentMovie.map((movie: any, index: number) => {
    try {
      return (
        <tr key={index} className="tr-movie">
          <td className="table-item">{movie.id}</td>
          <td className="table-item table-id">{movie.tenPhim}</td>
          <td className="table-item table-id">{movie.biDanh}</td>
          <td className="table-item">
            <img src={movie.hinhAnh} alt="" style={{ width: '60px' }} />
          </td>
          <td
            className={classNames('table-item', 'label-des', {
              'format-des': movie.moTa.length > 100,
            })}
          >
            {movie.moTa}
          </td>
          <td className="table-item">
            <button
              className="btn btn-success mb-2"
              style={{ width: '-webkit-fill-available' }}
              onClick={() => handleEditMovie(movie)}
            >
              {t('home:label_btn_modify')}
            </button>
            <button
              className="btn btn-danger"
              style={{ width: '-webkit-fill-available' }}
              onClick={() => handleDeleteMovie(movie)}
            >
              {t('home:label_btn_delete')}
            </button>
          </td>
        </tr>
      );
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'renderMovie',
          args: {},
        });
      }
    }
  });

  const onchangeMoviePerPage = (e: any) => {
    try {
      setmoviePerPage(e.target.value);
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'renderMovie',
          args: { e },
        });
      }
    }
  };

  const handleInsertData = () => {
    try {
      utils.showPopup();
      setMovieEdit('');
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'handleInsertData',
          args: {},
        });
      }
    }
  };

  const handleEditMovie = (movie: any) => {
    try {
      utils.showPopup();
      setMovieEdit(movie);
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'handleEditMovie',
          args: { movie },
        });
      }
    }
  };

  const handleDeleteMovie = (movie: any) => {
    try {
      utils.showPopupDelete();
      setMovieDelete(movie);
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'handleDeleteMovie',
          args: { movie },
        });
      }
    }
  };

  const getSuggestionSearch = (item: any) => {
    try {
      if (item !== '') {
        setArraySuggestion(item);
      } else {
        setArraySuggestion('');
      }
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'getSuggestionSearch',
          args: { item },
        });
      }
    }
  };

  const onclickPlusCurrentPage = () => {
    try {
      if (currentPage < pageNumbers.length) {
        setCurrentPage(+currentPage + 1);
      }
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'onclickPlusCurrentPage',
          args: {},
        });
      }
    }
  };

  const onclickMinusCurrentPage = () => {
    try {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'onclickMinusCurrentPage',
          args: {},
        });
      }
    }
  };

  return (
    <>
      <Header />
      <div className="H-body">
        <div className="container home-header-body mb-4">
          <button className="btn btn-success" onClick={handleInsertData}>
            <i className="fa fa-plus-circle mr-1" aria-hidden="true" />
            {t('home:label_create_movie')}
          </button>
          <Search
            dataSearch={listMovie}
            callBackArraySuggest={(item: any) => getSuggestionSearch(item)}
          />
        </div>
      </div>
      {arraySuggestion ? (
        <div>
          <table className="table-movie">
            <tr>
              <th className="th-default">{t('home:label_id')}</th>
              <th className="th-default">{t('home:label_name_movie')}</th>
              <th className="th-default">{t('home:label_alias_movie')}</th>
              <th className="th-default">{t('home:label_image_movie')}</th>
              <th className="th-default">{t('home:label_description')}</th>
              <th className="th-default">{t('home:label_action')}</th>
            </tr>
            {arraySuggestion &&
              arraySuggestion.map((movie: any, index: number) => {
                return (
                  <tr key={index} className="tr-movie">
                    <td className="table-item">{movie.id}</td>
                    <td className="table-item">{movie.tenPhim}</td>
                    <td className="table-item">{movie.biDanh}</td>
                    <td className="table-item">
                      <img
                        src={movie.hinhAnh}
                        alt=""
                        style={{ width: '60px' }}
                      />
                    </td>
                    <td className="table-item label-des">{movie.moTa}</td>
                    <td className="table-item">
                      <button
                        className="btn btn-success mb-2"
                        style={{ width: '-webkit-fill-available' }}
                        onClick={() => handleEditMovie(movie)}
                      >
                        {t('home:label_btn_modify')}
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ width: '-webkit-fill-available' }}
                        onClick={() => handleDeleteMovie(movie)}
                      >
                        {t('home:label_btn_delete')}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      ) : (
        <div>
          <table className="table-movie">
            <tr>
              <th className="th-default">{t('home:label_id')}</th>
              <th className="th-default">{t('home:label_name_movie')}</th>
              <th className="th-default">{t('home:label_alias_movie')}</th>
              <th className="th-default">{t('home:label_image_movie')}</th>
              <th className="th-default">{t('home:label_description')}</th>
              <th className="th-default">{t('home:label_action')}</th>
            </tr>
            {renderMovie}
          </table>
          <div style={{ maxWidth: '880px' }} className="container mt-3">
            <span className="label-show">{t('home:label_show')}</span>
            <select
              className="label-select"
              onChange={e => onchangeMoviePerPage(e)}
            >
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
              <option value={12}>12</option>
            </select>

            <div style={{ textAlign: 'end' }}>
              <button
                className="btn-page-number"
                onClick={onclickMinusCurrentPage}
              >
                <i className="fa fa-angle-left " aria-hidden="true"></i>
              </button>
              {pageNumbers &&
                pageNumbers.map((number: any) => {
                  return (
                    <button
                      key={number}
                      value={number}
                      onClick={e => handleClick(e)}
                      className={classNames('btn-page-number', {
                        'active-btn': currentPage == number,
                      })}
                    >
                      {number}
                    </button>
                  );
                })}
              <button
                className="btn-page-number"
                onClick={onclickPlusCurrentPage}
              >
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      )}
      <InserUpdateform dataEdit={movieEdit} />
      <DeletePopup dataDelete={movieDelete} />
    </>
  );
};

export default Home;
