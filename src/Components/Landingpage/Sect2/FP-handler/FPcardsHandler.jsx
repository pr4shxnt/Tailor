import React from 'react';
import UpdatedItems1 from '../Featured-products/men/UpdatedItems1';
import FPcards from './FPcards';
import UpdatedItems2 from '../Featured-products/Women/UpdatedItems2';

const FPmenCardsHandler = () => {
  return (
    <div className='ml-3'>
      <h1 className='text-center text-4xl font-bold '>Featured Products</h1>
      <p className='text-center text-sm mb-7'>Check out the featured products of Lorem, ipsum Tailors.</p>

      <div className="overflow-x-auto w-full scrollbar-hide  mb-4 ">
        <div className="mapping-elem justify-center grid grid-flow-col gap-4"> 
       
          {UpdatedItems1.map((elem) => (
            <FPcards
              key={elem.id}
              id={elem.id}
              name={elem.name}
              fabric={elem.fabric}
              price={elem.price}
              image={elem.image}
            />
          ))}
        </div>
      </div>



      <div className="overflow-x-auto w-full scrollbar-hide mt-4 mb-3">
        <div className="mapping-elem justify-center grid grid-flow-col gap-4"> 
          
          {UpdatedItems2.map((elem) => (
            <FPcards
              key={elem.id}
              id={elem.id}
              name={elem.name}
              fabric={elem.fabric}
              price={elem.price}
              image={elem.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FPmenCardsHandler;
