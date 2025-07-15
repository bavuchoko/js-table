import React from "react";

export type JsTableProps ={
    header: Header[];
    setting?: Setting;
    data: any[]
    page?: Page
    theme?: String;
    style?: React.CSSProperties;
    onHeaderClick?: (event: React.MouseEvent) => void;
    onHeaderUpdate?: (newOrder: string[]) => void;
    onRowClick?: (event: React.MouseEvent) => void;
    onPageChange?: (event: React.MouseEvent) => void;
    resizable?: boolean;
    draggable?: boolean;
}

export type Header = {
    key: string;
    label: string;
    style?: React.CSSProperties;
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