import React, { useContext } from 'react';
import { WLContext } from './WishlistContext';
import Cards from '../Cards/Cards';

const WishListContainer = () => {
    const { wishList } = useContext(WLContext);
    console.log('wishlist:', wishList);

    // Filter out items with null or undefined productId
    const validWishList = wishList?.filter(item => item?.productId);

    return (
        <div>
            <h1 className='text-5xl font-semibold'>Your WishList</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-6 mt-3">
                {validWishList && validWishList.length > 0 ? (
                    validWishList.map((item) => (
                        <div key={item.productId?._id}>
                            <Cards product={item.productId} />
                        </div>
                    ))
                ) : (
                    <p>No items in wishlist</p>
                )}
            </div>
        </div>
    );
};

export default WishListContainer;
