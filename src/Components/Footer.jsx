import {Facebook,Instagram, User , Twitter} from 'lucide-react';

const Footer = () => {
  return (
    <footer>
      <section className="bg-black h-full rounded-t-lg text-white w-full pt-16 px-3 md:px-32">
        <div className="text-white w-full flex justify-between ">
        <div className="left w-1/2 md:w-1/3">
          <h1 className="text-3xl font-bold">
            Brands speaks !
          </h1>
          <p>
            Brands are the people who create, sell, and distribute products or services to the public. They are often associated with fashion, technology, and entertainment. Brands are responsible for creating and maintaining a product or service, as well as ensuring that it meets the needs and expectations of their target audience.
          </p>
        </div>
        <div className="right flex flex-col w-1/3">
          <h1 className="text-2xl font-bold" >Follow Us on Social Media</h1>
          <ul className='flex flex-col text-start gap-2'>
            <li className='flex items-center gap-2 justify-start'>
                <Facebook/>
                Facebook
            </li>

            <li className='flex items-center gap-2  justify-start'>
                <Instagram/>
                Instagram
            </li>

            <li className='flex items-center gap-2 justify-start'>
                <User/>
                TikTok
            </li>

            <li className='flex items-center gap-2 justify-start'>
                <   Twitter/>
                Twitter
            </li>
          </ul>

        </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
