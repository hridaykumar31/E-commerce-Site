import React, { useEffect, useState, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { getAllProductAPI, deleteProductAPI } from '../Api/e-commerceApi'; // Assuming this fetches products
// You'll likely need API functions for update and delete as well:
// import { deleteProductAPI, updateProductAPI } from '../Api/e-commerceApi'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const navigate = useNavigate(); 
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await getAllProductAPI(token);
        setProducts(response.data.products || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- Handle Edit and Delete Actions (Placeholder Functions) ---
  const handleEdit = (productId) => {

    console.log('Edit product with ID:', productId);
    navigate(`/product/edit/${productId}`);
  };
  const handelProduct = () => {
    console.log('Add new product');
    navigate('/add/product');
  }

  const handleDelete = async (productId) => {
    if (window.confirm(`Are you sure you want to delete product with ID: ${productId}?`)) {
      try {
        // In a real application, you'd call your delete API here:
        await deleteProductAPI(productId, localStorage.getItem('token'));
        
        // For demonstration, let's simulate deletion from local state
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
        console.log('Deleted product with ID:', productId);
        // You might want to show a success message here
      } catch (err) {
        console.error('Error deleting product:', err);
        // You might want to show an error message here
        alert('Failed to delete product.');
      }
    }
    
  };
  // ----------------------------------------------------------------

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: info => info.getValue(),
      },
      // In your columns definition:
      {
        accessorKey: 'image',
        header: 'Image',
        cell: info => {
        const imageName = info.getValue();
        if (!imageName) return <span>No Image</span>;
       // console.log(`http://127.0.0.1:8000/api/test-image/${encodeURIComponent(imageName)}`);
        return (  
          <img
        src={`http://127.0.0.1:8000/api/test-image/${encodeURIComponent(imageName)}`}
        alt="Product"
        style={{ width: '100px', height: '80px', border: '1px solid red' }}
      />

        );

      },
        enableSorting: false,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: info => <span className="font-semibold text-gray-800">{info.getValue()}</span>,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: info => <span className="text-green-600 font-medium">${info.getValue()}</span>,
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        cell: info => (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            info.getValue() > 50 ? 'bg-green-100 text-green-800' :
            info.getValue() > 10 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {info.getValue()}
          </span>
        ),
        

      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: info => <p className="text-gray-600 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{info.getValue()}</p>,
      },
      {
        id: 'actions', // Unique ID for this column
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.original.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-md transition duration-300 transform hover:scale-105"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md transition duration-300 transform hover:scale-105"
            >
              Delete
            </button>
          </div>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    [] // Re-render columns only if dependencies change (none for now)
  );

  const table = useReactTable({
    data: products,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if(loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="ml-4 text-xl text-blue-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center bg-red-100 border border-red-400 text-red-700 rounded-md">
        <p className="font-bold">Error!</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 tracking-wide">
        Product Catalog
      </h2>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search all products..."
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 w-full sm:max-w-xs text-lg"
        />
        {/* You could add an "Add New Product" button here */}
      <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transition duration-300 transform hover:scale-105" onClick={handelProduct}>
          Add New Product
        </button>
      </div>

      {table.getRowModel().rows.length === 0 ? (
        <p className="text-center text-gray-600 text-lg py-10 bg-gray-50 rounded-lg">
          No products found matching your search criteria.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold uppercase tracking-wider cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' ⬆️',
                        desc: ' ⬇️',
                      }[header.column.getIsSorted()] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className="hover:bg-blue-50 transition duration-200 even:bg-gray-50"
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 p-4 bg-gray-50 rounded-lg shadow-inner">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {'<< First'}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {'< Prev'}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {'Next >'}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {'Last >>'}
          </button>
        </div>
        <span className="flex items-center gap-2 text-gray-700">
          <div>Page</div>
          <strong className="text-blue-700">
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-2 text-gray-700">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-2 rounded-md w-20 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductList;