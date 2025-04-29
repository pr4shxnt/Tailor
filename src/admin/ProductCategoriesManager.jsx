import React from 'react'
import MasterCategory from '../Components/AdminUI/MasterCategory'
import Category from '../Components/AdminUI/Category'
import SubCategorySelect from '../Components/AdminUI/SubCategory'

const ProductCategoriesManager = () => {
  return (
    <div>
      <div className="flex bg-primary">
        <div className="w-full"><MasterCategory/></div><div className="w-full"><Category/></div><div className="w-full"><SubCategorySelect/></div>
        
        
        </div>
    </div>
  )
}

export default ProductCategoriesManager