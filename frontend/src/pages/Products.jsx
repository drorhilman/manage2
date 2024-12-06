import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Box, Button, Input, Heading, List, ListItem, Spinner, useToast } from '@chakra-ui/react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', active: true });
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const toast = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
      } catch (error) {
        toast({
          title: "Error loading products.",
          description: error.message,
          status: "error",
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
      toast({
        title: "Product added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchProducts();
    } catch (error) {
      toast({
        title: "Error adding product.",
        description: error.message,
        status: "error",
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
      toast({
        title: "Product updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchProducts();
    } catch (error) {
      toast({
        title: "Error updating product.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const productDoc = doc(db, 'products', id);
      await deleteDoc(productDoc);
      toast({
        title: "Product deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchProducts();
    } catch (error) {
      toast({
        title: "Error deleting product.",
        description: error.message,
        status: "error",
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
      toast({
        title: "Error toggling product status.",
        description: error.message,
        status: "error",
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
    return <Spinner />;
  }

  return (
    <Box>
      <Heading>Products</Heading>
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <List>
        {currentProducts.map(product => (
          <ListItem key={product.id}>
            {product.name} - ${product.price} - {product.active ? 'Active' : 'Inactive'}
            <Button onClick={() => handleToggleActive(product.id, product.active)}>Toggle Active</Button>
            <Button onClick={() => setEditingProduct(product)}>Edit</Button>
            <Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
      <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastProduct >= filteredProducts.length}>Next</Button>
    </Box>
  );
};

export default Products;
