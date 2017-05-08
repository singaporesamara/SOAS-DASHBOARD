import { ADD_INVOICE_ITEM } from '../constants/invoices';

export function addInvoiceItem({ code, name, description, price, quantity, gst, total }) {
  return {
    type: ADD_INVOICE_ITEM,
    payload: { code, name, description, price, quantity, gst, total },
  };
}
