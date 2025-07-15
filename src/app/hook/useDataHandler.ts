import { useState, useCallback } from "react";

export function useDataHandler(data: any[]) {
    const [checked, setChecked] = useState<number[]>([]);

    const handleCheckboxClick = useCallback((value: number) => {
        setChecked(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    }, []);

    const handleHeaderCheckboxClick = useCallback(() => {
        const allChecked = data.every(item => checked.includes(item.id));
        const currentPageIds = data.map(item => item.id);

        if (!allChecked) {
            setChecked(prev => Array.from(new Set([...prev, ...currentPageIds])));
        } else {
            setChecked(prev => prev.filter(item => !currentPageIds.includes(item)));
        }
    }, [checked, data]);

    const isThisPageAllChecked = useCallback(() => {
        return data.every(item => checked.includes(item.id));
    }, [checked, data]);


    const getNestedValue =(obj: any, path: String)=> {
        return path.split('.').reduce((acc, part) => {
            if (Array.isArray(acc)) {
                return acc.map(item => item[part]).join(', ');
            }
            return acc && acc[part];
        }, obj);
    }


    return {
        checked,
        handleCheckboxClick,
        handleHeaderCheckboxClick,
        isThisPageAllChecked,
        setChecked,
        getNestedValue
    };
}
