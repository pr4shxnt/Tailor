import ImageCarousel from "./Carousels"
import backgroundImage from "../../../assets/white-minimal-hexagons-background/5134336.jpg"
import SlidingIcon from "../../Cards/SlidingIcons";
import { Home } from "lucide-react";
import { AuthContext } from "../../Log-in/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context/ContextProvider";
import useAuth from "../../../hooks/useAuth";
import { NavLink } from "react-router-dom";

const Homepage = () => {

  const {isUserAuthenticated, userData} = useContext(AuthContext);
  const { theme } = useContext(Context);
  const { login, logout, token } = useAuth();

  
  
  const [isDark, setIsDark] = useState(false);


 
  

  console.log(isDark);
  

  return (
    <section
    className={`pb-11 md:min-h-screen container mx-auto bg-cover bg-center ${isDark ? "bg-black" : ""}`}
    style={{ backgroundImage: `url(${theme === "dark" ? "" : backgroundImage })` }}
  >
      <div className="container mx-auto">
        <div className="w-[90%] lg:w-[85%] relative mx-auto pt-24 pb-8">
          <div className="gap-8">
            <div className="">
              <div className="text-[26px] md:text-5xl py-9  md:pt-14 pb-3 flex flex-col md:flex-row justify-between w-full font-semibold tracking-normal md:tracking-wide space-y-2">
                <div className="">
                  <div className="animate-fade-in-up opacity-0 flex gap-3">
                    Walk with a Pride
                  </div>
                  <div className="animate-fade-in-up opacity-0 animation-delay-400">
                    Live with a passion
                  </div>
                  <div className="animate-fade-in-up opacity-0 animation-delay-600 flex gap-3">
                    Go with <h1 className="text-purple-500">the Fashion...</h1>
                  </div>
                </div>
                <div className="text-2xl flex flex-col  justify-end items-end text-end">
                  <h1 className="text-3xl animate-fade-in-up animation-delay-400 opacity-0">Hello,</h1>
                  <h1 className="animate-fade-left-right animation-delay-1000 opacity-0">{userData.name ? userData.name : "Guest User"}</h1>
                  <p className="text-xs animate-fade-left-right animation-delay-1000 opacity-0 text-purple-500 font-light underline">
                  <h1>{userData.name ? <NavLink to={`/user/account`}>View Your Acccount</NavLink> :  <NavLink to={`/login`}>Log in into Your Acccount</NavLink>}</h1>
                  </p>       
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full animate-fade-in-up animation-delay-400 opacity-0 relative">
          <ImageCarousel />
        </div>
      </div>
    </section>
  );
};

export default Homepage;
