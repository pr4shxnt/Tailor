import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Category = () => {
    const [category, setCategory] = useState([])

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}/categories`)
            setCategory(response.data)
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    useEffect(() => {

        fetchCategories()
    }, [])
    
    console.log(category);
    
  return (
    <div>

    </div>
  )
}

export default Category