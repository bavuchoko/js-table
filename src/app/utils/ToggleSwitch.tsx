import {FC, useState} from "react";
import {ToggleProp} from "./SettingPop";

const ToggleSwitch: FC<ToggleProp> = ({ value, fnc }) => {
    return (
        <div
            role="switch"
            aria-checked={value}
            onClick={() => fnc(!value)}
            style={{
                position: 'relative',
                display: 'inline-flex',
                height: '20px',
                width: '35px',
                alignItems: 'center',
                borderRadius: '9999px',
                backgroundColor: value ? '#2563eb' : '#d1d5db',
                padding: '0',
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
                boxShadow: 'none', // ← 중요
            }}
            tabIndex={0}
        >
      <span
          style={{
              position: 'absolute',
              height: '14px',
              width: '14px',
              left: value ? 'calc(100% - 16px)' : '2px',
              top: '3px',
              borderRadius: '50%',
              backgroundColor: 'white',
              transition: 'left 150ms ease-in-out',
          }}
      />
        </div>
    );
};

export default ToggleSwitch;
