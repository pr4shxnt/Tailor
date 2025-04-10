import React from 'react'
import { Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <div>
        <div className="relative w-96">
                            <input type="text" placeholder='Search...' className='bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 px-4 py-2 pl-10 w-full rounded-full' />
                            <div className="absolute top-2 left-3 text-purple-600">
                                <Search size={20} />
                            </div>
                        </div>
    </div>
  )
}

export default SearchBar