import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import InvoiceForm from './components/InvoiceForm';
import InvoiceGrid from './components/InvoiceGrid';

const initialInvoice = {
  qty: '',
  price: '',
  discountPercentage: '',
  discount: 0,
  taxPercentage: '',
  tax: 0,
  total: 0,
};

function App() {
  const [invoices, setInvoices] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState(initialInvoice);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (invoice) => {
    if (!invoice.qty || !invoice.price) {
      alert('Quantity and Price are required!');
      return;
    }
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

  const handleCancelEdit = () => {
    setCurrentInvoice(initialInvoice);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
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
        onCancel={handleCancelEdit}
        isEditing={!!editingId}
      />
      <InvoiceGrid invoices={invoices} onEdit={handleEdit} onDelete={handleDelete} />
    </Container>
  );
}

export default App;
