import { fromJS } from 'immutable';
import { sum, map } from 'lodash';
import { ADD_INVOICE_ITEM, CLEAR_INVOICE } from '../../constants/invoices';

const CURRENT_INVOICE_STATE = { items: [], total: 0, gst: 0 };
const initialInvoicesState = fromJS({ list: [], current: CURRENT_INVOICE_STATE });

const GST = 0.08;
const withGST = (amount, hasGST) => (hasGST ? 1 + GST : 1) * amount;
const getGST = (amount, hasGST) => hasGST ? GST * amount : 0;

export default function reducer(state = fromJS(initialInvoicesState), action) {
  switch (action.type) {
    case ADD_INVOICE_ITEM: {
      const items = state.getIn(['current', 'items']).push(action.payload);
      const total = sum(map(items.toJS(), (item) => withGST(item.price * item.quantity, item.gst)));
      const gst = sum(map(items.toJS(), (item) => getGST(item.price * item.quantity, item.gst)));
      return state.merge({ current: { items, total, gst } });
    }
    case CLEAR_INVOICE:
      return state.merge({ current: CURRENT_INVOICE_STATE });
    default:
      return state;
  }
}
