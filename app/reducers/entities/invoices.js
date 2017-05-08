import { fromJS } from 'immutable';
import { sum, map } from 'lodash';
import { ADD_INVOICE_ITEM, CLEAR_INVOICE } from '../../constants/invoices';

const CURRENT_INVOICE_STATE = { items: [], total: 0 };
const initialInvoicesState = fromJS({ list: [], current: CURRENT_INVOICE_STATE });

export default function reducer(state = fromJS(initialInvoicesState), action) {
  switch (action.type) {
    case ADD_INVOICE_ITEM: {
      const items = state.getIn(['current', 'items']).push(action.payload);
      const total = sum(map(items.toJS(), (item) => item.price * item.quantity));
      return state.merge({ current: { items, total } });
    }
    case CLEAR_INVOICE:
      return state.merge({ current: CURRENT_INVOICE_STATE });
    default:
      return state;
  }
}
