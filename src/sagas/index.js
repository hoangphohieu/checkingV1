// file này để combine các sagas lại 

import { all } from 'redux-saga/effects';
import { IteamSaga } from './ItemSaga';
import { PartnerSaga } from './PartnerSaga';

function* rootsaga() {
    yield all([...IteamSaga,...PartnerSaga])
}
export default rootsaga;