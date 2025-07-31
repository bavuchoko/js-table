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
            height:'40px',
            lineHeight : '40px',
        },
        table:{
            borderRight:'1px solid var(--deepGray)',
            borderBottom: '1px solid var(--deepGray)',
        }
    };


    const thThemeStyleMap: Record<string, React.CSSProperties> = {
        linear: {
            fontWeight : 'normal',
            height:'40px',
            lineHeight : '40px',
            fontSize : '11px',
            color : 'gray',
            textIndent : '10px',
        },
        table:{
            borderBottom: '1px solid var(--deepGray)',
            background: 'var(--th)',
            borderRight:'1px solid var(--deepGray)',
        }
    };

    const backgroundTheme = background ? backgroundStyleMap[background] :{} ;
    const tdThemeStyle = theme ? tdThemeStyleMap[theme] : tdThemeStyleMap['table'] ;
    const thThemeStyle = theme ? thThemeStyleMap[theme] : thThemeStyleMap['table'] ;

    return { hasPagination, heightStyle,  backgroundStyle: backgroundTheme, thThemeStyle, tdThemeStyle };
}