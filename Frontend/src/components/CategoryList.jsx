import React, { useEffect, useState } from 'react'
import { deleteCategoryAPI, getAllCategoryAPI } from '../Api/e-commerceApi';
import {useNavigate} from 'react-router-dom';
import {
  useReactTable, 
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useMemo } from 'react';
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  useEffect(() => {

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await getAllCategoryAPI(token);
      console.log(res);
      setCategories(res.data.categories || []);

    } catch(err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }
   fetchCategories();
  }, []);
 

  const handleEdit = (id) => {
      navigate('/category/edit/${id}');
  }

  const handleAdd = () => {
    navigate('add/category');
  }

  const handelDelete = async (id) => {
    if(window.confirm('Delete category ${id}?')) {
      try {
        const token = localStorage.getItem('token');
        await deleteCategoryAPI(id, token);
        setCategories((prev) => {
          prev.filter((c) => c.id != id);
        })

      } catch {
        console.log('Failed to delete category');
      }
    }
  }

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: ID,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: info => 
        <strong>{info.getValue()}</strong>
        
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: info => 
        <p className='truncate max-w-xs'>{info.getValue()}</p>
    },
    


  ]) 

  return (

    <div>CategoryList</div>
     
  )
}

export default CategoryList