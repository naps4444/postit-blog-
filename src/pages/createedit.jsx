import CreateEditBlog from '@/components/blog/CreateEditBlog'
import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

const createedit = () => {
  return (

    <>
    <Navbar/>
    
    <div className="flex justify-center items-center py-10 mb-5 border border-t-2">
    <CreateEditBlog/>        
    </div>
    
    <Footer/>
    </>
  )
}

export default createedit