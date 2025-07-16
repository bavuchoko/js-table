import { useState } from "react";

const ToggleSwitch = () => {
    const [enabled, setEnabled] = useState(false);

    return (
        <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-4 w-7 items-center rounded-full
              ${enabled ? "bg-blue-600" : "bg-gray-300"}
              focus:outline-none
            `}
            tabIndex={0}
        >
      <span
          className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform
          ${enabled ? "translate-x-3.5" : "translate-x-1"}`}
      />
        </button>
    );
};

export default ToggleSwitch;
