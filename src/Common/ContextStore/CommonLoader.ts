import { useContext } from "react";
import { Context } from "../../App";

const SpinShow = (bool:boolean) => {
   //debugger
    const [context, setContext] = useContext<any[]>(Context);
    if(bool === true) {
        setContext((prevState:any) => ({
            ...prevState,
            Spin:true
        }));
    }
    else {
        setContext((prevState:any) => ({
            ...prevState,
            Spin:false
        }));
    }
}
export default SpinShow