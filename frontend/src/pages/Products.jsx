import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Toaster, toaster } from '../components/ui/toaster';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', active: true });
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
      } catch (error) {
        toaster.create({
          title: "Error loading products.",
          description: error.message,
          type: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      const productsCollection = collection(db, 'products');
      await addDoc(productsCollection, newProduct);
      setNewProduct({ name: '', price: '', active: true });
      toaster.create({
        title: "Product added.",
        type: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchProducts();
    } catch (error) {
      toaster.create({
        title: "Error adding product.",
        description: error.message,
        type: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (id) => {
    try {
      const productDoc = doc(db, 'products', id);
      await updateDoc(productDoc, editingProduct);
      setEditingProduct(null);
      toaster.create({
        title: "Product updated.",
        type: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchProducts();
    } catch (error) {
      toaster.create({
        title: "Error updating product.",
        description: error.message,
        type: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const productDoc = doc(db, 'products', id);
      await deleteDoc(productDoc);
      toaster.create({
        title: "Product deleted.",
        type: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchProducts();
    } catch (error) {
      toaster.create({
        title: "Error deleting product.",
        description: error.message,
        type: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const productDoc = doc(db, 'products', id);
      await updateDoc(productDoc, { active: !currentStatus });
      fetchProducts();
    } catch (error) {
      toaster.create({
        title: "Error toggling product status.",
        description: error.message,
        type: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded p-2"
      />
      <ul>
        {currentProducts.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price} - {product.active ? 'Active' : 'Inactive'}
            <button className="bg-yellow-500 text-white p-1 rounded" onClick={() => handleToggleActive(product.id, product.active)}>Toggle Active</button>
            <button className="bg-blue-500 text-white p-1 rounded" onClick={() => setEditingProduct(product)}>Edit</button>
            <button className="bg-red-500 text-white p-1 rounded" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastProduct >= filteredProducts.length}>Next</button>
      <Toaster />
    </div>
  );
};

export default Products;
