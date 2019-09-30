// file này để combine các sagas lại 

import { all } from 'redux-saga/effects';
import { IteamSaga } from './ItemSaga';
import { PartnerSaga } from './PartnerSaga';
import { ExcelSaga } from './ExcelSaga';
import { TrackingSaga } from './TrackingSaga';

function* rootsaga() {
    yield all([...IteamSaga,...PartnerSaga,...ExcelSaga,...TrackingSaga])
}
export default rootsaga;