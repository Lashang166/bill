import store from 'store';

export default (store.get('itemperpage')) ? store.get('itemperpage') : 10;