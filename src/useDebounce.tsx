import {useEffect, useState} from "react";
import {clearTimeout} from "timers";

interface DebounceItem{
    value: number;
    delay: number;
}
/*attraverso questo useDebounce è possibile settare un tempo massimo di fetch di API, dopo il quale interrompere la ricerca*/
function useDebounce ({value, delay}:DebounceItem):number {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() =>{
            setDebouncedValue(value);
        }, delay);

        return (() => clearTimeout(handler))
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;