import React, { useState, useRef, useCallback } from "react";
//@ts-ignore
import { Header } from "../type/Types";

type ColumnWidths = number[];

export const useColumnWidths = (
    resizable:boolean=false,
    headers: Header[],
    onResizeWidth?: (widths: number[]) => void,
    ) => {

    const getInitialWidths = (headers: Header[]): ColumnWidths => {
        return headers.map((header) => {
            const width = header.style?.width;
            if (typeof width === "number") return width;
            if (typeof width === "string") {
                const parsed = parseInt(width, 10);
                return isNaN(parsed) ? 100 : parsed;
            }
            return 100;
        });
    };
    const initialWidths = getInitialWidths(headers);

    const columnWidthsRef = useRef<ColumnWidths>(initialWidths);
    const [columnWidths, setColumnWidths] = useState<ColumnWidths>(initialWidths);

    const resizingColumn = useRef<number | null>(null);
    const startX = useRef<number>(0);

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (!resizable) return;
        if (resizingColumn.current === null) return;

        const deltaX = event.clientX - startX.current;
        const columnIndex = resizingColumn.current;

        setColumnWidths((prevWidths) => {
            const newWidths = [...prevWidths];
            newWidths[columnIndex] = Math.max(50, prevWidths[columnIndex] + deltaX);
            columnWidthsRef.current = newWidths;
            return newWidths;
        });

        startX.current = event.clientX;
    }, [resizable]);

    const handleMouseUp = useCallback(() => {
        if (!resizable) return;
        resizingColumn.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        onResizeWidth?.(columnWidthsRef.current);
    }, [resizable, handleMouseMove, onResizeWidth]);

    const handleMouseDown = useCallback(
        (event: React.MouseEvent<HTMLDivElement>, colIndex: number) => {
            if (!resizable) return;
            startX.current = event.clientX;
            resizingColumn.current = colIndex;

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        },
        [resizable, handleMouseMove, handleMouseUp]
    );

    return { columnWidths, setColumnWidths, handleMouseDown };
};
