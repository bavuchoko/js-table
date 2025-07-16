export function useCustomStyle(usePagination: boolean | 'top' | 'bottom' | undefined, theme: string | undefined) {
    const hasPagination =
        usePagination === true || usePagination === 'top' || usePagination === 'bottom';

    const heightStyle = `calc(100% - ${hasPagination ? '31px' : '0px'})`;

    const themeClassMap: Record<string, string> = {
        dot: 'bg-lightGray bg-dots bg-dot',
        line: 'bg-lightGray bg-lines',
        solid: 'bg-gray-200',
    };

    const themeClass = theme ? themeClassMap[theme] ?? '' : '';

    return { hasPagination, heightStyle, themeClass };
}