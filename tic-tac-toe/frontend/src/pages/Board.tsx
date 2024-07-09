import { Square } from "../components/Square";

export const Board=()=>{
    return <>
   <div className="flex h-screen justify-center items-center ">
   <div>
        <Square  />
        <Square />
        <Square  />
    </div>
    <div>
    <Square  />
        <Square />
        <Square  />
    </div>
    <div>
    <Square  />
        <Square />
        <Square  />
    </div>
    
   </div>
    </>
}