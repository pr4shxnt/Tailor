import React, { useContext } from 'react';
import { WLContext } from './WishlistContext';
import Cards from '../Cards/Cards';

const WishListContainer = () => {
    const { wishList } = useContext(WLContext);
    console.log(wishList);

    return (
        <div>
            {wishList?.length > 0 ? (
                wishList.map((item) => (
                    <Cards key={item.productId._id} products={item.productId} />
                ))
            ) : (
                <p>No items in wishlist</p>
            )}
        </div>
    );
};

export default WishListContainer;
