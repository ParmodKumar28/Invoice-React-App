import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import InvoiceForm from './components/InvoiceForm';
import InvoiceGrid from './components/InvoiceGrid';

const initialInvoice = {
  qty: 0,
  price: 0,
  discountPercentage: 0,
  discount: 0,
  taxPercentage: 0,
  tax: 0,
  total: 0,
};

function App() {
  const [invoices, setInvoices] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState(initialInvoice);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (invoice) => {
    if (editingId) {
      setInvoices(invoices.map((inv) => (inv.id === editingId ? { ...invoice, id: editingId } : inv)));
      setEditingId(null);
    } else {
      setInvoices([...invoices, { ...invoice, id: Date.now() }]);
    }
    setCurrentInvoice(initialInvoice);
  };

  const handleEdit = (invoice) => {
    setCurrentInvoice(invoice);
    setEditingId(invoice.id);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Invoice Creator
      </Typography>
      <InvoiceForm
        invoice={currentInvoice}
        onSubmit={handleSubmit}
        onUpdate={setCurrentInvoice}
      />
      <InvoiceGrid invoices={invoices} onEdit={handleEdit} />
    </Container>
  );
}

export default App;