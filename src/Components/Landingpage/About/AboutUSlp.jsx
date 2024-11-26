import React from 'react'
import "../../../index.css"
import { Link } from 'react-router-dom'


const AboutUSlp = () => {
  return (
    <>
     <section>

<div className="flex-box flex justify-around align-center p-8">
  

  <div className="about-text-box w-2/5">
    <h1 className='font-semibold text-2xl '>
      Why us?
    </h1>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet deserunt voluptatem nisi aperiam quidem sunt, a asperiores, magnam nam dignissimos voluptas amet numquam inventore delectus architecto molestias odio reiciendis eos autem. Explicabo doloremque consequatur eius corporis, obcaecati accusamus facere, exercitationem deserunt perspiciatis voluptate ex qui nisi ipsam nam assumenda soluta sapiente. Non officia veritatis porro aspernatur eos accusamus dolore ratione. Ratione excepturi, dolorem, voluptatibus culpa soluta repellendus enim hic at aspernatur nam optio. Provident alias ipsam maxime? Quaerat reprehenderit adipisci repellendus illum, provident ad rem, pariatur veritatis asperiores labore exercitationem amet ipsam aspernatur ex minima, dicta voluptatum fugiat? Fugit, voluptatibus!
    </p>
    <Link to="/about">
<button className='px-2 py-1 border-dashed border-gray-400 border-2 rounded-md mt-4 text-gray-400 hover:border-gray-400 hover:bg-gray-400 transition-all duration-700 hover:text-black'>
  Read More
</button>
</Link>
  </div>

  <div className="imgbox">
    <img className='size-96' src="https://img.freepik.com/free-vector/teamwork-concept-landing-page_52683-20165.jpg" alt="" />
  </div>
</div>



    </section>
    </>
  )
}

export default AboutUSlp
