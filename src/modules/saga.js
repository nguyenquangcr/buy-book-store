import Axios from 'axios';
import { takeEvery, put, delay } from 'redux-saga/effects';
import { getlistmoviesuccess } from '../redux/slice/MovieSlice';
import { getlistusersuccess } from '../redux/slice/UserSlice';
import * as utils from '../utils';
import i18n from 'i18next';


function* getListUser() {
    try {
        const listUser = yield Axios.get('http://localhost:3000/user')
        yield put({ type: 'GET-LIST-USER-SUCCESS', payload: listUser.data });
        yield put(getlistusersuccess(listUser.data));
    } catch (error) {
        console.log('error', error);
    }
}

function* getListMovie() {
    try {
        yield delay(1000);
        const listMovie = yield Axios.get('http://localhost:3000/movie')
        yield put(getlistmoviesuccess(listMovie.data))
    } catch (error) {
        console.log('error', error);
    }
}

function* insertMovie(props) {
    try {
        yield Axios({
            method: "POST",
            url: "http://localhost:3000/movie",
            data: props.value
        })
        yield alert(i18n.t('middleware:label_alert_insert_movie_success'));
        yield utils.closePopup();
    } catch (error) {
        yield alert(i18n.t('middleware:label_alert_insert_movie_false'));
    }
}

function* editMovie(props) {
    try {
        yield Axios({
            method: "PATCH",
            url: `http://localhost:3000/movie/${props.value.id}`,
            data: props.value
        })
        yield alert(i18n.t('middleware:label_alert_modify_movie_success'));
        yield utils.closePopup();
    } catch (error) {
        yield alert(i18n.t('middleware:label_alert_modify_movie_false'));
    }
}

function* deleteMovie(props) {
    try {
        yield Axios({
            method: "DELETE",
            url: `http://localhost:3000/movie/${props.value}`,
        })
        yield alert(i18n.t('middleware:label_alert_delete_movie_success'));
        yield utils.closePopupDelete();
    } catch (error) {
        yield alert(i18n.t('middleware:label_alert_delete_movie_false'));
    }
}

export function* rootsaga() {
    try {
        yield takeEvery("GET-LIST-USER", getListUser);
        yield takeEvery("GET-LIST-MOVIE", getListMovie);
        yield takeEvery("INSERT-MOVIE", props => insertMovie(props));
        yield takeEvery("EDIT-MOVIE", props => editMovie(props));
        yield takeEvery("DELETE-MOVIE", props => deleteMovie(props))
    } catch (error) {
        console.log('error' , error);
    }
}