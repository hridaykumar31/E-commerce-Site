import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getProductByIdAPI,
  updateProductAPI,
  getAllCategoryAPI,
  getAllTagAPI
} from '../Api/e-commerceApi';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    sku: '',
    image: null,
    category_id: '',
    tag_ids: [],
  });

  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const productData = await getProductByIdAPI(id, token);
        console.log('data is : ', productData.data.product.name);

        setProduct({
          name: productData.data.product.name,
          price: productData.data.product.price,
          description: productData.data.product.description,
          stock: productData.data.product.stock,
          sku: productData.data.product.sku,
          image: null, // not sending existing image unless replaced
          category_id: productData.data.product.category_id,
          tag_ids: productData.data.product.tags.map(tag => tag.id),
        });

        // Tags and Categories
        const tagRes = await getAllTagAPI(token);
        setTags(tagRes.data.tags);

        const categoryRes = await getAllCategoryAPI(token);
        setCategories(categoryRes.data.category);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategorySelect = (e) => {
    setProduct(prev => ({
      ...prev,
      category_id: parseInt(e.target.value),
    }));
  };

  const handleTagSelect = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
    setProduct(prev => ({
      ...prev,
      tag_ids: selectedTags,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('description', product.description);
      formData.append('stock', product.stock);
      formData.append('sku', product.sku);
      if (product.image) formData.append('image', product.image);
      formData.append('category_id', product.category_id);
      product.tag_ids.forEach(id => formData.append('tag_ids[]', id));
      console.log('print all formdata', formData);

      await updateProductAPI(id, formData, token);
      alert('Product updated successfully');
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className='min-h-svh max-w-full mx-auto mt-2 p-6 bg-white shadow-md rounded-md'>
      <h1 className='text-2xl'>Edit Product</h1>
      <form onSubmit={handleSubmit} className='mt-4'>
        <div className='mb-4'>
          <label className='block'>Product Name</label>
          <input
            type='text'
            name='name'
            value={product.name}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block'>Price</label>
          <input
            type='number'
            name='price'
            value={product.price}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block'>Description</label>
          <textarea
            name='description'
            value={product.description}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block'>Stock</label>
          <input
            type='number'
            name='stock'
            value={product.stock}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block'>SKU</label>
          <input
            type='text'
            name='sku'
            value={product.sku}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block'>Image (optional)</label>
          <input
            type='file'
            name='image'
            onChange={(e) => setProduct(prev => ({
              ...prev,
              image: e.target.files[0]
            }))}
            className='w-full border px-3 py-2 rounded'
          />
        </div>

        <div className='mb-4'>
          <label className='block'>Tags</label>
          <select
            multiple
            value={product.tag_ids}
            onChange={handleTagSelect}
            className='w-full border px-3 py-2 rounded h-32'
          >
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label className='block'>Category</label>
          <select
            value={product.category_id}
            onChange={handleCategorySelect}
            className='w-full border px-3 py-2 rounded'
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type='submit'
          className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-400'
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
