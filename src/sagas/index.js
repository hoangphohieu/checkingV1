// file này để combine các sagas lại 

import { all } from 'redux-saga/effects';
import { CheckingSaga } from './CheckingSaga';
import { PartnerSaga } from './PartnerSaga';
import { ExcelSaga } from './ExcelSaga';
import { TrackingSaga } from './TrackingSaga';
import { TrackingMoreSaga } from './TrackingMoreSaga';
import { UseSaga } from './UseSaga';

function* rootsaga() {
    yield all([...CheckingSaga, ...PartnerSaga, ...ExcelSaga, ...TrackingSaga, ...UseSaga, ...TrackingMoreSaga])
}
export default rootsaga;