import { put, takeLatest } from 'redux-saga/effects';

import products from './data/products.json';
import { actions } from '.';

export function* fetchProducts() {
  yield put(actions.productsLoaded(products));
}

/**
 * Root saga manages watcher lifecycle
 */
export function* homePageSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadProducts.type, fetchProducts);
}
