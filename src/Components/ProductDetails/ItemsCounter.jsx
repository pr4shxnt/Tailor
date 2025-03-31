import React from 'react'
import { Minus, Plus } from 'lucide-react'


const ItemsCounter = ({quantity, setQuantity}) => {
  
  const HandleAddition = () =>{
    setQuantity(quantity+1)
  }

  const HandleSubstraction = () =>{
   if(quantity===1){
    return null
   }
   else{
    setQuantity(quantity-1)
   }
  }

  return (
    <div className="flex flex-col gap-1">
       <h1 className='text-sm'>Quantity:</h1>
    <div className='flex h-10 items-center gap-3 border border-second-secondary '>
      <div onClick={HandleSubstraction} className="border-r border-second-secondary h-full flex items-center px-2"> <Minus className='' size={16} /></div>
     
      <div className="w-10 justify-center flex text-second-secondary  select-none">
           {quantity}
        </div> 
        <div onClick={HandleAddition} className="border-l border-second-secondary h-full flex items-center px-2"> <Plus size={16} /></div>
    </div>
    </div>
  )
}

export default ItemsCounter