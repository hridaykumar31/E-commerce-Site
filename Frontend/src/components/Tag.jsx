import React, { useState, useEffect } from 'react'

import { addTagAPI, getAllProductAPI } from '../Api/e-commerceApi';

const Tag = () => {
    const [tag, setTag] = useState(
        {
            name: '',
            description: '',
            product_ids: [],
        }
    )
  const[products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await getAllProductAPI(token);
            setProducts(response.data.products);
            console.log('Product fetched ', response.data.products);

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    fetchProducts();
  }, []);


  const handleChange = (e) => {
  const {name, value} = e.target;
  setTag((prev) => (
      {
        ...prev,
        [name]: value,
      }
  ));

   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await addTagAPI(tag, token);
      console.log('Tag added successfully:', response.data);
      // setTag({
      //   name: '',
      //   description: '',
      //   product_ids: [],
      // })

    } catch (error) {
       console.error('Error adding product:', error);
    }
  }

  const handleProductSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
    setTag((prev) => {
      return {
        ...prev,
        product_ids: selectedOptions,
      }
    })
  }

  return (
    <div className='min-h-svh  Category max-w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-md'>
      <h1 className='text-2xl'>Add Tag</h1>
      <form onSubmit={handleSubmit} className='mt-4'>

        <div className='mb-4'>
          <label className='mb-2 block'>Tag Name</label>
          <input
            type='text'
            name='name'
            onChange={handleChange}
            value={tag.name}
            className='w-full border px-3 py-2 rounded'
            placeholder='Enter Category Name'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='mb-2 block'>Tag Description</label>
          <textarea
            name='description'
            onChange={handleChange}
            value={tag.description}
            className='w-full border px-3 py-2 rounded'
            placeholder='Enter Tag Description'
            required
          />

        </div>
         <div className='mb-4'>
          <label className='block mb-1'>Assign Products</label>
          <select
            multiple
            onChange={handleProductSelect}
            className='w-full border px-3 py-2 rounded h-32'
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400'
        >
          Add Tag
        </button>
      </form>
    </div>
  )
}

export default Tag