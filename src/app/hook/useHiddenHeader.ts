import { useState, useEffect } from "react";

export function useHiddenHeader(
    initialHidden: string[] = [],
    onHiddenUpdate?: (newHidden: string[]) => void
) {
    const [hidden, setHidden] = useState<string[]>(initialHidden);

    const hideColumn = (key: string) => {
        if (!hidden.includes(key)) {
            const newHidden = [...hidden, key];
            setHidden(newHidden);
            onHiddenUpdate?.(newHidden);
        }
    };

    const showColumn = (key: string) => {
        const newHidden = hidden.filter(k => k !== key);
        setHidden(newHidden);
        onHiddenUpdate?.(newHidden);
    };

    const toggleColumn = (key: string) => {
        const newHidden = hidden.includes(key)
            ? hidden.filter(k => k !== key)
            : [...hidden, key];
        setHidden(newHidden);
        onHiddenUpdate?.(newHidden);
    };

    return {
        hidden,
        setHidden: (value: string[]) => {
            setHidden(value);
            onHiddenUpdate?.(value);
        },
        hideColumn,
        showColumn,
        toggleColumn,
    };
}
