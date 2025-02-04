import React from 'react'
import MasterCategory from '../Components/AdminUI/MasterCategory'
import Category from '../Components/AdminUI/Category'
import SubCategorySelect from '../Components/AdminUI/SubCategory'

const ProductCategoriesManager = () => {
  return (
    <div>
        <MasterCategory/>
        <Category/>
        <SubCategorySelect/>
    </div>
  )
}

export default ProductCategoriesManager