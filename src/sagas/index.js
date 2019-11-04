// file này để combine các sagas lại 

import { all } from 'redux-saga/effects';
import { CheckingSaga } from './CheckingSaga';
import { HomeSaga } from './HomeSaga';
import { UploadSaga } from './UploadSaga';
import { TrackingSaga } from './TrackingSaga';
import { UseSaga } from './UseSaga';

function* rootsaga() {
    yield all([...CheckingSaga, ...HomeSaga, ...UploadSaga, ...TrackingSaga, ...UseSaga])
}
export default rootsaga;