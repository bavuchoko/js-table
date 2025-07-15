// src/utils/dragUtils.ts

/**
 * 드래그 시작 시
 */
export const handleDragStart = (
    e: React.DragEvent<HTMLTableHeaderCellElement>,
    columnIndex: number
) => {
    e.dataTransfer.setData("columnIndex", columnIndex.toString());
};

/**
 * 드롭 허용
 */
export const allowDrop = (
    e: React.DragEvent<HTMLTableHeaderCellElement>
) => {
    e.preventDefault();
};

/**
 * 드래그 오버 시 - 컬럼 순서 바꾸기
 */
export const handleDragOver = (
    e: React.DragEvent<HTMLTableHeaderCellElement>,
    columnIndex: number,
    order: string[],
    setOrder: (columns: string[]) => void,
    onHeaderUpdate?: (newOrder: string[]) => void,
) => {
    e.preventDefault();

    const dragIndex = Number(e.dataTransfer.getData("columnIndex"));
    if (dragIndex !== columnIndex) {
        const newColumns = [...order];
        const [draggedColumn] = newColumns.splice(dragIndex, 1);
        newColumns.splice(columnIndex, 0, draggedColumn);
        setOrder(newColumns);

        if (onHeaderUpdate) {
            onHeaderUpdate(newColumns);
        }
    }
};