import { useState, useEffect, useRef } from "react";
import FilterpageMview from "./FilterpageMview";
import { X } from "lucide-react";

const SortFilterButton = ({
  handleReset,
  setSortOrder,
  setSortState,
  setFilteredBrands,
  brands,
  selectedBrands,
  setFilteredSizes,
  sizes,
  selectedSizes,
  setFilteredPrice,
  showCase,
  minPrice,
  maxPrice,
}) => {
  const [isDiv1Visible, setIsDiv1Visible] = useState(false);
  const [isDiv2Visible, setIsDiv2Visible] = useState(false);
 // Tracks the current sort state
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);

  const isAnyDivVisible = isDiv1Visible || isDiv2Visible;



  const closeDiv = () => {
    setIsDiv1Visible(false);
    setIsDiv2Visible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDiv1Visible &&
        div1Ref.current &&
        !div1Ref.current.contains(event.target)
      ) {
        closeDiv();
      }
      if (
        isDiv2Visible &&
        div2Ref.current &&
        !div2Ref.current.contains(event.target)
      ) {
        closeDiv();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDiv1Visible, isDiv2Visible]);

  return (
    <div className="relative">
      <div className="flex  py-1 bg-white">
        <div onClick={() => setIsDiv1Visible(!isDiv1Visible)} className="w-full border-r-2 border-r-gray-200">
          <div className="justify-center items-center  flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 19 19"
              enable-background="new 0 0 19 19"
              class="w-[22PX]"
            >
              <g>
                <g opacity="0">
                  <g opacity="0">
                    <rect x="0" y="0" fill="none" width="19" height="19"></rect>
                  </g>
                </g>
                <path
                  fill="#2A3B53"
                  d="M1.4,18.3c-0.3,0-0.5-0.2-0.5-0.5c0-0.3,0.2-0.5,0.5-0.5h4c0.3,0,0.5,0.2,0.5,0.5c0,0.3-0.2,0.5-0.5,0.5 H1.4z"
                ></path>
                <path
                  fill="#2A3B53"
                  d="M1.4,15c-0.3,0-0.5-0.2-0.5-0.5S1.1,14,1.4,14h5.4c0.3,0,0.5,0.2,0.5,0.5S7.1,15,6.8,15H1.4z"
                ></path>
                <path
                  fill="#2A3B53"
                  d="M1.4,11.7c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h6.7c0.3,0,0.5,0.2,0.5,0.5s-0.2,0.5-0.5,0.5H1.4z"
                ></path>
                <path
                  fill="#2A3B53"
                  d="M1.4,8.4c-0.3,0-0.5-0.2-0.5-0.5c0-0.3,0.2-0.5,0.5-0.5h8c0.3,0,0.5,0.2,0.5,0.5c0,0.3-0.2,0.5-0.5,0.5H1.4 z"
                ></path>
                <path
                  fill="#2A3B53"
                  d="M1.4,5C1.1,5,0.9,4.8,0.9,4.5C0.9,4.2,1.1,4,1.4,4h9.4c0.3,0,0.5,0.2,0.5,0.5C11.2,4.8,11,5,10.7,5H1.4z"
                ></path>
                <path
                  fill="#2A3B53"
                  d="M1.4,1.7c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h11.6c0.3,0,0.5,0.2,0.5,0.5s-0.2,0.5-0.5,0.5H1.4z"
                ></path>
                <path
                  fill="gray"
                  d="M14,18.3c-0.2,0-0.4-0.2-0.4-0.4V4.5c0-0.1,0-0.2,0.1-0.3C13.7,4.1,13.8,4,14,4c0.2,0,0.4,0.2,0.4,0.4v13.4 c0,0.1,0,0.2-0.1,0.3C14.2,18.3,14.1,18.3,14,18.3z"
                ></path>
                <path
                  fill="gray"
                  d="M14,18.3c-0.1,0-0.2,0-0.3-0.1l-3.7-3.7c-0.2-0.2-0.2-0.5,0-0.6c0.1-0.1,0.2-0.1,0.3-0.1 c0.1,0,0.2,0,0.3,0.1l3.7,3.7c0.2,0.2,0.2,0.5,0,0.6C14.2,18.3,14.1,18.3,14,18.3z"
                ></path>
                <path
                  fill="gray"
                  d="M14,18.3c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.3c0-0.1,0-0.2,0.1-0.3l3.7-3.7 c0.1-0.1,0.2-0.1,0.3-0.1c0.1,0,0.2,0,0.3,0.1c0.2,0.2,0.2,0.5,0,0.6l-3.7,3.7C14.2,18.3,14.1,18.3,14,18.3z"
                ></path>
              </g>
            </svg>{" "}
            <div className="flex flex-col ">
              <h4>Sort</h4>
              <p className="text-[11px]">{
              showCase? showCase : "No Sort Applied"


             }</p>
            </div>
          </div>
        </div>
        <div onClick={() => setIsDiv2Visible(!isDiv2Visible)} className="w-full">
          <div className="justify-center items-center flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 19 19"
              enable-background="new 0 0 19 19"
              class="w-[22PX]"
            >
              <g>
                <g opacity="0">
                  <rect x="0" y="0" fill="none" width="19" height="19"></rect>
                </g>
                <g>
                  <path
                    fill="gray"
                    d="M10.7,3.9H2.6l0.9,1h7.2c0.3,0,0.5-0.2,0.5-0.5v0C11.2,4.1,11,3.9,10.7,3.9z"
                  ></path>
                  <path
                    fill="#2A3B53"
                    d="M7.8,18.7c-0.2,0-0.4-0.1-0.6-0.2C7.1,18.4,7,18.1,7,17.9V11c0-0.4-0.1-0.7-0.3-1l-6-8.5 C0.4,1.3,0.4,1,0.6,0.7C0.7,0.4,1,0.3,1.3,0.3h16.4c0.3,0,0.6,0.2,0.7,0.4c0.1,0.3,0.1,0.6-0.1,0.9l-6,8.5c-0.2,0.3-0.3,0.6-0.3,1 v5.6c0,0.4-0.2,0.7-0.5,0.8l-3.4,1.3C8,18.7,7.9,18.7,7.8,18.7z M7.5,9.4C7.8,9.9,8,10.4,8,11v6.6l3-1.1V11c0-0.6,0.2-1.1,0.5-1.6 l5.8-8.2H1.7L7.5,9.4z"
                  ></path>
                </g>
              </g>
            </svg>
            <div className="flex flex-col">
              <h4>Filter</h4>
              <p className="text-xs">Filter products</p>
            </div>
          </div>
        </div>
      </div>

      {isAnyDivVisible && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity duration-300 z-20"
          onClick={closeDiv}

        />
      )}

      {/* Sort */}
      <div
        ref={div1Ref}
        className={`fixed  bottom-0 left-1/2 transform -translate-x-1/2 w-full  bg-white text-primary-foreground p-2 rounded-t-xl transition-transform duration-300 ease-in-out z-30 ${
          isDiv1Visible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ display: isDiv1Visible ? "block" : "none" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Sort</h2>
          <div onClick={closeDiv} aria-label="Close Div 1">
            <X className="h-4 w-4 cursor-pointer" />
          </div>
        </div>
        <div className="max-h-[70vh] overflow-y-auto">
          <div className="flex flex-col justify-start items-start">
            <div
              onClick={() => {
                setSortState("asc");
                setSortOrder("asc");
              }}
              className="flex w-full justify-between items-center border-b text-sm py-4"
            >
              Price: Low to High
            </div>

            <div
              onClick={() => {
                setSortState("desc");
                setSortOrder("desc");
              }}
              className="flex w-full justify-between items-center text-sm py-4"
            >
              Price: High to Low
            </div>
            <div className="w-full border-t rounded-t-xl">
              <button
                onClick={closeDiv}
                className="bg-black text-white rounded-xl p-2 w-full btn-small"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div
        ref={div2Ref}
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full  bg-white rounded-t-xl transition-transform duration-300 ease-in-out z-30 ${
          isDiv2Visible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ display: isDiv2Visible ? "block" : "none" }}
      >
        <div className="flex justify-between items-center p-3 border-b-2 border-gray-200">
          <h2 className="text-2xl font-bold">Filter</h2>
          <div onClick={closeDiv} aria-label="Close Div 2">
            <X className="h-4 w-4 cursor-pointer" />
          </div>
        </div>
        <div>
          <FilterpageMview
          minPrice={minPrice}
          maxPrice={maxPrice}
            handleReset={handleReset}
            closeDiv={closeDiv}
            setFilteredBrands={setFilteredBrands}
            brands={brands}
            selectedBrands={selectedBrands}
            setFilteredSizes={setFilteredSizes}
            sizes={sizes}
            selectedSizes={selectedSizes}
            setFilteredPrice={setFilteredPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default SortFilterButton;
