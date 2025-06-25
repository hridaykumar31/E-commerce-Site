import React, { useEffect, useState } from 'react';
import { getAllCategoryAPI } from '../Api/e-commerceApi';

const Home = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getAllCategoryAPI(token);
        setCategory(response?.data.category || []);
        console.log('Categories fetched:', response.data.category);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className='container'>
      <div className='card-container'>
       {
        category.length > 0 ? (
          category.map((cat) => {
            const imageUrl = `http://127.0.0.1:8000/api/test-image/${encodeURIComponent(cat.img || '')}`;

             return (
              <div key={cat.id} className='category-card'>
               
                <div className='card-image'>
                  <img src={imageUrl} alt={cat.name} className='w-full h-40 object-center mx-auto' />
                  
                </div>

              </div>
             )
          })
        ) : (<p>category not found</p>)
       }
        
      </div>


      
    </div>
  );
};

export default Home;
