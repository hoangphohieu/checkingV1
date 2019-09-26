// file này để combine các sagas lại 

import { all } from 'redux-saga/effects';
import { IteamSaga } from './ItemSaga';
import { PartnerSaga } from './PartnerSaga';
import { ExcelSaga } from './ExcelSaga';

function* rootsaga() {
    yield all([...IteamSaga,...PartnerSaga,...ExcelSaga])
}
export default rootsaga;