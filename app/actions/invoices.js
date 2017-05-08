import { ADD_INVOICE_ITEM, CREATE_INVOICE, CLEAR_INVOICE } from '../constants/invoices';

export function addInvoiceItem({ code, name, description, price, quantity, gst, total }) {
  return {
    type: ADD_INVOICE_ITEM,
    payload: { code, name, description, price, quantity, gst, total },
  };
}

export function createInvoice({ email, gst, total, items }) {
  return {
    type: CREATE_INVOICE,
    payload: { email, gst, total, items },
  };
}

export function clearInvoice() {
  return {
    type: CLEAR_INVOICE,
  };
}
