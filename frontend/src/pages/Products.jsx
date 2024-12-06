import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', active: true });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    const productsCollection = collection(db, 'products');
    await addDoc(productsCollection, newProduct);
    setNewProduct({ name: '', price: '', active: true });
    fetchProducts();
  };

  const handleUpdateProduct = async (id) => {
    const productDoc = doc(db, 'products', id);
    await updateDoc(productDoc, editingProduct);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
    fetchProducts();
  };

  const handleToggleActive = async (id, currentStatus) => {
    const productDoc = doc(db, 'products', id);
    await updateDoc(productDoc, { active: !currentStatus });
    fetchProducts();
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price} - {product.active ? 'Active' : 'Inactive'}
            <button onClick={() => handleToggleActive(product.id, product.active)}>
              Toggle Active
            </button>
            <button onClick={() => setEditingProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={editingProduct ? editingProduct.name : newProduct.name}
          onChange={(e) => {
            const value = e.target.value;
            if (editingProduct) {
              setEditingProduct({ ...editingProduct, name: value });
            } else {
              setNewProduct({ ...newProduct, name: value });
            }
          }}
        />
        <input
          type="text"
          placeholder="Price"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={(e) => {
            const value = e.target.value;
            if (editingProduct) {
              setEditingProduct({ ...editingProduct, price: value });
            } else {
              setNewProduct({ ...newProduct, price: value });
            }
          }}
        />
        <button onClick={editingProduct ? () => handleUpdateProduct(editingProduct.id) : handleAddProduct}>
          {editingProduct ? 'Update' : 'Add'}
        </button>
      </div>
    </div>
  );
};

export default Products;
