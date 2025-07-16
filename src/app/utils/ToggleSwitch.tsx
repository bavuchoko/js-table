import {FC, useState} from "react";
import {ToggleProp} from "./SettingPop";



const ToggleSwitch: FC<ToggleProp> = ({ value, fnc }) => {


    return (
        <button
            type="button"
            role="switch"
            aria-checked={value}
            onClick={() => fnc(!value)}
            className={`relative inline-flex h-4 w-7 items-center rounded-full
              ${value ? "bg-blue-600" : "bg-gray-300"}
              focus:outline-none
            `}
            tabIndex={0}
        >
      <span
          className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform
          ${value ? "translate-x-3.5" : "translate-x-1"}`}
      />
        </button>
    );
};

export default ToggleSwitch;
