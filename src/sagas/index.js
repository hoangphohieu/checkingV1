// file này để combine các sagas lại 

import { all } from 'redux-saga/effects';
import { IteamSaga } from './ItemSaga';
import { PartnerSaga } from './PartnerSaga';
import { ExcelSaga } from './ExcelSaga';
import { TrackingSaga } from './TrackingSaga';
import { UseSaga } from './UseSaga';

function* rootsaga() {
    yield all([...IteamSaga, ...PartnerSaga, ...ExcelSaga, ...TrackingSaga, ...UseSaga])
}
export default rootsaga;