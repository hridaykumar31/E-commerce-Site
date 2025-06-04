import React, { useState } from 'react';
import { addCategoryAPI } from '../Api/e-commerceApi';

const Category = () => {
  const [category, setCategory] = useState({
    name: '',
    description: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await addCategoryAPI(category, token);
      alert('Category added successfully');
      setCategory({ name: '', description: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add category');
    }
  };

  return (
    <div className='min-h-svh  Category max-w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-md'>
      <h1 className='text-2xl'>Add Category</h1>
      <form onSubmit={handleSubmit} className='mt-4'>
        <div className='mb-4'>
          <label className='mb-2 block'>Category Name</label>
          <input
            type='text'
            name='name'
            onChange={handleChange}
            value={category.name}
            className='w-full border px-3 py-2 rounded'
            placeholder='Enter Category Name'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='mb-2 block'>Category Description</label>
          <textarea
            name='description'
            onChange={handleChange}
            value={category.description}
            className='w-full border px-3 py-2 rounded'
            placeholder='Enter Category Description'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400'
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default Category;
