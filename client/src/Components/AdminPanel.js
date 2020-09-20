import React from 'react'
import ProductManagement from './ProductManagement'
const AdminPanel = ({ updateBook, showUpdateBook, showAddBook, addBook }) => {
  return (
    <section className='adminPanel'>
      <ProductManagement
        addBook={addBook}
        updateBook={updateBook}
        showUpdateBook={showUpdateBook}
        showAddBook={showAddBook}
      />
    </section>
  )
}
export default AdminPanel
