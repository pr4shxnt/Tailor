import { useContext } from "react";
import { Context } from "../../Context/ContextProvider";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(Context);

  return (
    <div className="flex items-center space-x-3">
      {/* Sun icon */}
      
      
      {/* Slider Button */}
      <div 
        className={`w-11 h-7  border-2  ${theme === "light" ? "bg-pink-100 border-yellow-500" : "bg-gray-800 border-purple-500"} relative flex items-center  rounded-full p-1 cursor-pointer transition duration-300`} 
        onClick={toggleTheme}
      >
        <div 
          className={` transition  absolute top-0.5 duration-300 ${theme === "dark" ? "translate-x-4 " : "translate-x-0"}`}
        > <Sun size={20} className={`transition  absolute rounded-full ${theme === "light" ? "text-yellow-500 fill-yellow-500" : "hidden"}`} /> <Moon size={20} className={`absolute  transition rounded-full ${theme === "dark" ? "text-purple-500 fill-purple-500 " : "hidden"}`} /></div>
      </div>

      {/* Moon icon */}
     
    </div>
  );
};

export default ThemeToggle;
