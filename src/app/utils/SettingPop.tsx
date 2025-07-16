
import ToggleSwitch from "./ToggleSwitch";
import {FC, useEffect, useRef} from "react";
import {Header} from "../type/Types";
import Eye from "./Eye";
import Blind from "./Blind";

export type ToggleProp ={
    value:boolean;
    fnc: (value :boolean) => void;
}

type SettingPopProps = {
    closePopup: () => void;
    toggleProp: ToggleProp;
    rowHeader: Header[];
    elements?: string[];
    showColumn?: (key: string) => void;
};

const SettingPop: FC<SettingPopProps> =({closePopup, toggleProp, rowHeader=[], elements=[], showColumn })=>{
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                closePopup();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closePopup]);

    return (
        <>
            <div className={` w-full h-full absolute top-0 z-40 bg-glass`}></div>
            <div
                ref={popupRef}
                className={`absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-white z-50 border flex shadow-strong`} >
                <div className={`mr-5`}>
                        <Eye style={{width:"20px", height:"20px", marginBottom:"17px"}} />
                        <Blind style={{width:"20px", height:"20px",}} />
                </div>
                <div className={``}>
                    <div className={` mt-[-3px] mb-[15px] ml-2`}> <ToggleSwitch  {...toggleProp} /></div>
                    <div className={`flex grid grid-cols-4 gap-3 bg-white `}>
                        {elements.map(el => {
                            const matched = rowHeader.find(h => h.key === el);
                            return (
                                <p
                                    key={el}
                                    className={`relative inline-block text-center text-[12px] py-0.5 px-2 rounded-2xl bg-white mr-2 mb-2 text-gray-800 font-bold`}
                                    onClick={() => showColumn?.(el)}
                                >
                                    {matched?.label ?? el}
                                    <span
                                        className="absolute -top-0.5 -right-1.5 w-[14px] h-[14px] text-[11px] flex items-center justify-center bg-red-400 text-white rounded-full cursor-pointer"
                                    >
                                    ×
                                  </span>
                                </p>
                            );
                        })}
                    </div>
                </div>

            </div>
        </>
    )
}
export default SettingPop;