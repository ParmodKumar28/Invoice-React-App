import React from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import { calculateDiscount, calculateTax, calculateTotal } from '../utils/calculations';

const InvoiceForm = ({ invoice, onSubmit, onUpdate, onCancel, isEditing }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedInvoice = { ...invoice, [name]: parseFloat(value) || 0 };

    const { qty, price, discountPercentage, taxPercentage } = updatedInvoice;
    const discount = calculateDiscount(price, qty, discountPercentage);
    const tax = calculateTax(price, qty, discount, taxPercentage);
    const total = calculateTotal(price, qty, discount, tax);

    onUpdate({
      ...updatedInvoice,
      discount,
      tax,
      total,
    });
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(invoice); }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth label="Quantity" name="qty" type="number" value={invoice.qty} onChange={handleChange} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth label="Price" name="price" type="number" value={invoice.price} onChange={handleChange} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth label="Discount %" name="discountPercentage" type="number" value={invoice.discountPercentage} onChange={handleChange} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth label="Discount" name="discount" type="number" value={invoice.discount.toFixed(2)} InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth label="Tax %" name="taxPercentage" type="number" value={invoice.taxPercentage} onChange={handleChange} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth label="Tax" name="tax" type="number" value={invoice.tax.toFixed(2)} InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth label="Total Price" name="total" type="number" value={invoice.total.toFixed(2)} InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {isEditing ? 'Update Invoice' : 'Create Invoice'}
            </Button>
            {isEditing && (
              <Button onClick={onCancel} variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default InvoiceForm;