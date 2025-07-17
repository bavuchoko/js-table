import React from "react";

export function useCustomStyle(usePagination: boolean | 'top' | 'bottom' | undefined,  background: string | undefined, theme: string | undefined) {
    const hasPagination =
        usePagination === true || usePagination === 'top' || usePagination === 'bottom';

    const heightStyle = `calc(100% - ${hasPagination ? '31px' : '0px'})`;

    const backgroundStyleMap: Record<string, React.CSSProperties> = {
        dot: {
            background: 'var(--lightGray)'	,
            backgroundImage: 'var(--dot)',
            backgroundSize: '10px 10px',
        },
    };

    const tdThemeStyleMap: Record<string, React.CSSProperties> = {
        linear: {
            borderColor: 'var(--lightGray)'	,
        },
        table:{
            borderColor: 'var(--deepGray)'	,
            borderRight:'1px solid',
        }
    };


    const thThemeStyleMap: Record<string, React.CSSProperties> = {
        linear: {
            borderBottom: '2px solid',
            borderColor: 'var(--linearThemeColor)'	,
        },
        table:{
            borderBottom: '1px solid',
            borderColor: 'var(--deepGray)'	,
            background: 'var(--th)',
            borderRight:'1px solid',
        }
    };

    const backgroundTheme = background ? backgroundStyleMap[background] :{} ;
    const tdThemeStyle = theme ? tdThemeStyleMap[theme] : tdThemeStyleMap['table'] ;
    const thThemeStyle = theme ? thThemeStyleMap[theme] : thThemeStyleMap['table'] ;

    return { hasPagination, heightStyle,  backgroundStyle: backgroundTheme, thThemeStyle, tdThemeStyle };
}