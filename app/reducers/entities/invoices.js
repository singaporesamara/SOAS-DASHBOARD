import { fromJS } from 'immutable';
import { sum, map } from 'lodash';
import { ADD_INVOICE_ITEM } from '../../constants/invoices';

const initialInvoicesState = fromJS({ list: [], current: { items: [], total: 0 } });

export default function reducer(state = fromJS(initialInvoicesState), action) {
  switch (action.type) {
    case ADD_INVOICE_ITEM: {
      const items = state.getIn(['current', 'items']).push(action.payload);
      const total = sum(map(items.toJS(), (item) => item.price * item.quantity));
      return state.merge({ current: { items, total } });
    }
    default:
      return state;
  }
}
