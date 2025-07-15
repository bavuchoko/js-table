import React, { useState, useRef, useCallback } from "react";
//@ts-ignore
import { Header } from "../type/Types";

type ColumnWidths = number[];

export const useColumnWidths = (resizable:boolean=false, headers: Header[]) => {
    const [columnWidths, setColumnWidths] = useState<ColumnWidths>(
        new Array(headers.length).fill(100)
    );

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
            return newWidths;
        });

        startX.current = event.clientX;
    }, []);

    const handleMouseUp = useCallback(() => {
        if (!resizable) return;
        resizingColumn.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = useCallback(
        (event: React.MouseEvent<HTMLDivElement>, colIndex: number) => {
            if (!resizable) return;
            startX.current = event.clientX;
            resizingColumn.current = colIndex;

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        },
        [handleMouseMove, handleMouseUp]
    );

    return { columnWidths, setColumnWidths, handleMouseDown };
};
