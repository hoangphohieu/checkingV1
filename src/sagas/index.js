// file này để combine các sagas lại 

import { all } from 'redux-saga/effects';
import { IteamSaga } from './ItemSaga';

function* rootsaga() {
    yield all([...IteamSaga])
}
export default rootsaga;