import React, { useState, useEffect } from 'react'
import { addProductAPI, getAllCategoryAPI, getAllTagAPI } from '../Api/e-commerceApi';

const Product = () => {
    const [product, setProduct] = useState(
        {
            name: '',
            price: '',
            description: '',
            stock: '',
            sku: '',
            image: null,
            category_id: '',
            tag_ids: [],
        }
    )
  const[tags, setTags] = useState([]);
  const[categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchTags = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await getAllTagAPI(token);
            setTags(response.data.tags);
            //console.log('Tags fetched ', response.data.tags);

        } catch (error) {
            console.error('Error fetching Tags:', error);
        }
    }
     const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await getAllCategoryAPI(token);
            setCategories(response?.data?.category || []);
            console.log('Category fetched ', response.data.category);

        } catch (error) {
            console.error('Error fetching Category:', error);
        }
    }
    fetchTags();
    fetchCategories();

  }, []);


  const handleChange = (e) => {
  const {name, value} = e.target;
  setProduct((prev) => (
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
      const response = await addProductAPI(product, token);
      console.log('Product added successfully:', response.data);
      setProduct({
        name: '',
        price: '',
        description: '',
        stock: '',
        sku: '',
        image: null,
        category_id: '',
        tag_ids: [],
      })

    } catch (error) {
       console.error('Error adding tag:', error);
    }
  }

  const handleTagSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
    setProduct((prev) => {
      return {
        ...prev,
        tag_ids: selectedOptions,
      }
    })
  }

  const handleCategorySelect = (e) => {
    const selectedOption = parseInt(e.target.value);
    setProduct((prev) => {
      return {
        ...prev,
        category_id: selectedOption,
      }
    })
  }

  return (
    <div className='min-h-svh  Category max-w-full mx-auto mt-2 p-6 bg-white shadow-md rounded-md'>
      <h1 className='text-2xl'>Add New Product</h1>
      <form onSubmit={handleSubmit} className='mt-4'>

        <div className='mb-4'>
          <label className='mb-2 block'>Product Name</label>
          <input
            type='text'
            name='name'
            onChange={handleChange}
            value={product.name}
            className='w-full border px-3 py-2 rounded'
            placeholder='Enter Product Name'
            required
          />
        </div>

         <div className='mb-4'>
          <label className='mb-2 block'>Product Price</label>
          <input
            type='number'
            name='price'
            onChange={handleChange}
            value={product.price}
            className='w-full border px-3 py-2 rounded'
            placeholder='Enter Product Price'
            required
          />
         </div>

        <div className='mb-4'>
          <label className='mb-2 block'>Product Description</label>
          <textarea
            name='description'
            onChange={handleChange}
            value={product.description}
            className='w-full border px-3 py-2 rounded'
            placeholder='Enter Product Description'
            required
          />

          <div className='mb-4'>
          <label className='mb-2 block'>Product Stock</label>
          <input
            type='number'
            name='stock'
            onChange={handleChange}
            value={product.stock}
            className='w-full border px-3 py-2 rounded'
            placeholder='Enter Product Stock Number'
            required
          />
         </div>

          <div className='mb-4'>
          <label className='mb-2 block'>Product SKU</label>
          <input
            type='text'
            name='sku'
            onChange={handleChange}
            value={product.sku}
            className='w-full border px-3 py-2 rounded'
            placeholder='Enter Product Sku'
            required
          />
         </div>

         <div className='mb-4'>
          <label className='mb-2 block'>Product Image</label>
              <input type='file' name='image' onChange={(e) => setProduct((prev) => (
                {
                  ...prev,
                  image: e.target.files[0],
                }
              ))}
            accept='image/*' className='w-full border px-3 py-2 rounded'
            placeholder='Enter Image url'/>
         </div>

        </div>
         <div className='mb-4'>
          <label className='block mb-1'>Select multiple tag</label>
          <select
            multiple
            onChange={handleTagSelect}
            className='w-full border px-3 py-2 rounded h-32'
          >
            {tags.map((tag) => (
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
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400'
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default Product