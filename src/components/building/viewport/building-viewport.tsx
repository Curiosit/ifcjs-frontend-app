
import {FC, useEffect, useRef} from "react";
import { useAppContext } from "../../../middleware/context-provider";

export const BuildingViewport: FC = () => {

    const [{user, building},dispatch] = useAppContext();
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        console.log(container);
        dispatch({type: "START_BUILDING", payload:{container,building}})
    }, []);

    return(<div className="full-screen" ref={containerRef}> </div>)
}