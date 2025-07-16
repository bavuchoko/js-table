import React from "react";
type PaginationPosition = 'top' | 'bottom' ;
type Theme = 'dot' | 'normal';


export type JsTableProps ={
    header: Header[];
    setting?: Setting;
    data: any[]
    page?: Page;
    usePagination?:boolean | PaginationPosition;
    useSetting?:boolean;
    theme?: Theme;
    style?: Style;
    onHeaderMove?: (newOrder: string[]) => void;
    onHiddenUpdate?: (newHidden: string[]) => void;
    onResizeWidth?: (newOrder: number[]) => void;
    onRowClick?: (id: number) => void;
    onPageChange?: (clickPage: number) => void;
    resizable?: boolean;
    draggable?: boolean;
}
export type Style = {
    header?:  React.CSSProperties;
    body?:  React.CSSProperties;
};

export type Header = {
    key: string;
    label?: string;
    style?: React.CSSProperties;
    renderer?: (row: any) => React.ReactNode;
};
export type Setting = {
    order?: string[];
    hidden?: string[];
}
export type Page = {
    currentPage?: number;
    totalElements?: number;
    totalPages?: number;
    size?: number;
    sort?: string[];
    desc?: string;
}
