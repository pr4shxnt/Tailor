import ImageCarousel from "./Carousels"
import backgroundImage from "../../../assets/white-minimal-hexagons-background/5134336.jpg"
import SlidingIcon from "../../Cards/SlidingIcons";
import { Home } from "lucide-react";
import { AuthContext } from "../../Log-in/AuthProvider";
import { useContext } from "react";
import useAuth from "../../../hooks/useAuth";

const Homepage = () => {

  const {isUserAuthenticated, userData} = useContext(AuthContext)
  console.log(userData);
  const { login, logout, token } = useAuth();
  

  return (
    <section 
      className="pb-11 container mx-auto bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container mx-auto">
        <div className="w-[90%] lg:w-[85%] relative mx-auto pt-24 pb-8">
          <div className="gap-8">
            <div className="">
              <div className="text-5xl py-14 pb-3 flex justify-between w-full font-semibold tracking-wide space-y-2">
                <div className="">
                  <div className="animate-fade-in-up opacity-0 flex gap-3">
                    Walk with a <h1 className="">Pride</h1>
                  </div>
                  <div className="animate-fade-in-up opacity-0 animation-delay-400">
                    Live with a passion
                  </div>
                  <div className="animate-fade-in-up opacity-0 animation-delay-600 flex gap-3">
                    Go with <h1 className="text-purple-500">the Fashion...</h1>
                  </div>
                </div>
                <div className="text-2xl  absolute bottom-10 right-10 text-end">
                  <h1 className="text-4xl animate-fade-in-up animation-delay-400 opacity-0">Hello,</h1>
                  <h1 className="animate-fade-left-right animation-delay-1000 opacity-0">{userData.name}</h1>
                  <p className="text-xs animate-fade-left-right animation-delay-1000 opacity-0 text-purple-500 font-light underline">
                    View Your Account
                  </p>       
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full animate-fade-in-up animation-delay-1200 opacity-0 relative">
          <ImageCarousel />
        </div>
      </div>
    </section>
  );
};

export default Homepage;
