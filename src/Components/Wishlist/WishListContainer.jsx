import React, { useContext } from 'react';
import { WLContext } from './WishlistContext';
import Cards from '../Cards/Cards';

const WishListContainer = () => {
    const { wishList } = useContext(WLContext);
    console.log(wishList);

    return (
        <div className='pt-16'>
            <h1 className='text-5xl font-semibold '>Your WishList</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {wishList?.length > 0 ? (
               
                wishList.map((item) => (
                    <div className="">{console.log(item.productId)
                    }<Cards key={item.productId._id} product={item.productId} /></div>
                    

                ))
            ) : (
                <p>No items in wishlist</p>
            )}
        </div></div>
    );
};

export default WishListContainer;
