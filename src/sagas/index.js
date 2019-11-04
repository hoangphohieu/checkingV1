// file này để combine các sagas lại 

import { all } from 'redux-saga/effects';
import { CheckingSaga } from './CheckingSaga';
import { PartnerSaga } from './PartnerSaga';
import { UploadSaga } from './UploadSaga';
import { TrackingSaga } from './TrackingSaga';
import { UseSaga } from './UseSaga';

function* rootsaga() {
    yield all([...CheckingSaga, ...PartnerSaga, ...UploadSaga, ...TrackingSaga, ...UseSaga])
}
export default rootsaga;