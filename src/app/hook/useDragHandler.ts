// useDragHandler.ts
import { useState, useCallback } from "react";

export function useDragHandler(
    draggable:boolean =false,
    initialOrder: string[],
    onHeaderUpdate?: (newOrder: string[]) => void,
    columnWidthsState?: [number[], React.Dispatch<React.SetStateAction<number[]>>]
) {
    const [order, setOrder] = useState(initialOrder);
    const [columnWidths, setColumnWidths] = columnWidthsState || [[], () => {}];

    const handleDragStart = (e: React.DragEvent<HTMLElement>, index: number) => {
        if (!draggable) return;
        const target = e.target as HTMLElement;
        if (target.classList.contains("resize-handle")) {
            e.preventDefault();
            return;
        }
        e.dataTransfer.setData("columnIndex", index.toString());
    };

    const allowDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }, []);

    const handleDragOver = useCallback(
        (e: React.DragEvent<HTMLDivElement>, columnIndex: number) => {
            if (!draggable) return;
            e.preventDefault();
            const dragIndex = Number(e.dataTransfer.getData("columnIndex"));
            if (dragIndex !== columnIndex) {
                const newOrder = [...order];
                const [dragged] = newOrder.splice(dragIndex, 1);
                newOrder.splice(columnIndex, 0, dragged);

                const newWidths = [...columnWidths];
                const [draggedWidth] = newWidths.splice(dragIndex, 1);
                newWidths.splice(columnIndex, 0, draggedWidth);

                setOrder(newOrder);
                setColumnWidths(newWidths);
                onHeaderUpdate?.(newOrder);
            }
        },
        [order, columnWidths, onHeaderUpdate, setColumnWidths]
    );

    return {
        order,
        setOrder,
        handleDragStart,
        allowDrop,
        handleDragOver,
    };
}
