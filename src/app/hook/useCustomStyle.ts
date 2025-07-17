import React from "react";

export function useCustomStyle(usePagination: boolean | 'top' | 'bottom' | undefined, theme: string | undefined) {
    const hasPagination =
        usePagination === true || usePagination === 'top' || usePagination === 'bottom';

    const heightStyle = `calc(100% - ${hasPagination ? '31px' : '0px'})`;

    const themeStyleMap: Record<string, React.CSSProperties> = {
        dot: {
            background: 'var(--lightGray)'	,
            backgroundImage: 'var(--dot)',
            backgroundSize: '10px 10px',
        }
    };

    const themeStyle = theme ? themeStyleMap[theme] :{} ;

    return { hasPagination, heightStyle, themeStyle: themeStyle };
}