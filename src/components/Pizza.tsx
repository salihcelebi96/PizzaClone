import LargePizza from "../components/pizzalar/LargePizza";
import SmallPizza from "../components/pizzalar/SmallPizza";
import MediumPizza from "../components/pizzalar/MediumPizza";
import { useState } from "react";


const Pizza :React.FC= () => {
  const [option, setOption] = useState<string>("Large");

  const handleSelect = (selectedOption: string) => {
    setOption(selectedOption);
  };

  const options = ["Large", "Medium", "Small"];

  return (
    <div>
      <div className="mb-1 ">
        <select className="border outline-none" name="" id="" value={option} onChange={(e)=>handleSelect(e.target.value)}>
          {options.map((option,index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      
      {option === "Large" && <LargePizza />}
      {option === "Medium" && <MediumPizza />}
      {option === "Small" && <SmallPizza />}
    </div>
  );
};

export default Pizza;
