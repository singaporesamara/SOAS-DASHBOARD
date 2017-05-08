import { fromJS } from 'immutable';
import { ADD_INVOICE_ITEM } from '../../constants/invoices';

const initialInvoicesState = fromJS({ list: [], current: { items: [] } });

export default function reducer(state = fromJS(initialInvoicesState), action) {
  switch (action.type) {
    case ADD_INVOICE_ITEM: {
      const items = state.getIn(['current', 'items']).push(action.payload);
      return state.merge({ current: { items } });
    }
    default:
      return state;
  }
}
