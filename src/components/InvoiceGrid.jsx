import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const InvoiceGrid = ({ invoices, onEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Qty</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Discount %</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell>Tax %</TableCell>
            <TableCell>Tax</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.qty}</TableCell>
              <TableCell>{invoice.price.toFixed(2)}</TableCell>
              <TableCell>{invoice.discountPercentage}</TableCell>
              <TableCell>{invoice.discount.toFixed(2)}</TableCell>
              <TableCell>{invoice.taxPercentage}</TableCell>
              <TableCell>{invoice.tax.toFixed(2)}</TableCell>
              <TableCell>{invoice.total.toFixed(2)}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(invoice)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceGrid;