import React from 'react';
import Itemhandler from '../../Data/Itemhandler';
import Cards from './cards';
import "../../index.css"
import Itemhandler2 from '../../Data/Itemhandler2';
import Kidssitemhandler from '../../Data/Kidsitemhandler';


const Cardshandler = () => {
  return (
    <section className='pt-16'>

<div>
    <h1 className='text-2xl text-center text-black' ><b>Men's</b></h1>
    </div>
    <div className="overflow-x-auto w-full scrollbar-hide mb-3"> {/* Add scrollbar-hide class */}
      <div className="grid grid-flow-col gap-4 "> 
        {Itemhandler.map(elem => (
          <Cards
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


<div>
    <h1 className='text-2xl text-center' ><b>Women's</b></h1>
    </div>
<div className="overflow-x-auto w-full scrollbar-hide  mb-3"> 
  
  {/* Container for scrolling */}
<div className="grid grid-flow-col gap-4"> {/* Use grid-flow-col for horizontal scrolling */}
  {Itemhandler2.map(elem => (
    <Cards
      key={elem.id} // Don't forget the key prop!
      id={elem.id} 
      name={elem.name} 
      fabric={elem.fabric} 
      price={elem.price} 
      image={elem.image} 
    />
  ))}
</div>
</div>

<div>
    <h1 className='text-2xl text-center ' ><b>Kid's</b></h1>
    </div>
<div className="overflow-x-auto w-full scrollbar-hide  mb-3"> 
  
  {/* Container for scrolling */}
<div className="grid grid-flow-col gap-4"> {/* Use grid-flow-col for horizontal scrolling */}
  {Kidssitemhandler.map(elem => (
    <Cards
      key={elem.id} // Don't forget the key prop!
      id={elem.id} 
      name={elem.name} 
      fabric={elem.fabric} 
      price={elem.price} 
      image={elem.image} 
    />
  ))}
</div>
</div>
</section>
  );
};

export default Cardshandler;
