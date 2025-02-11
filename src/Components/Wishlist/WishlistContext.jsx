import axios from 'axios'
import React, { useContext, useState } from 'react'


export const WLContext= createContext();


const WishListProvider = ({children}) => {


    const [isWishListed, setisWishListed] = useState(false)
    const [WishList, setWishList] = useState(second)


    const user = localStorage.getItem('user')
    const parsedUser = JOSN.parse(user)
    const userId = parsedUser ? parsedUser.id : null;

    const getWishList = async () =>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/wishlist/${userId}`)
            setWishList(response.data)
        } catch (error) {
            
        }
    }
  return 
   <WLContext.Provider value={{}}>
        {children}
      </WLContext.Provider>
}

export default WishListProvider