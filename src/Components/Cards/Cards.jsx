import React from 'react';
import { Link } from "react-router-dom";

const Cards = (props) => {
  const gradient = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)';

  const cardStyle = {
    backgroundImage: `${gradient}, url(${props.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className='flex  flex-col  items-center gap-2 ml-7'>
      <div style={cardStyle} className=' cursor-pointer w-60 h-60 rounded-lg flex flex-col gap-1 justify-end items-start px-4 py-3 mt-4  '>
        <div className="flex-col gap-1 justify-end">
        
        <h1 className='text-xl text-white font-bold hover:text-gray-200'>{props.name}</h1> 
        
        <p className='text-xs text-white'>{props.fabric}, ${props.price} </p> 
        </div>
        
         
     
      
    
    
      </div>
      <Link to={`/product/${props.id}`} >
      <button className='bg-black w-60 hover:bg-zinc-900 p-2 rounded-xl text-white '>
                    Buy
                </button>
                </Link>

</div>
      
  );
};

export default Cards;
