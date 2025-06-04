import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className='bg-gray-500 text-blue text-center py-4'>
            <p className='text-2xl'>${new Date().getFullYear()} Hriday's System - All Rights Reserved </p>
            <p className='text-xl'>Powered by Hriday's Kumar</p>

        </footer>
    </div>
  )
}

export default Footer