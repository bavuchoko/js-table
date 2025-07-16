import {JsTableProps} from "./type/Types";
import {FC, useState} from "react";
import {useDataHandler} from "./hook/useDataHandler";
import {useDragHandler} from "./hook/useDragHandler";
import {useHeaderHandler} from "./hook/useHeaderHandler";
import {useColumnWidths} from "./hook/useColumnWidths";
import Pagination from "./utils/Pagination";
import Empty from '../app/resource/icon/empty.png'

const JsTable: FC<JsTableProps> = ({
                                       header,
                                       setting,
                                       data,
                                       page = undefined,
                                       usePagination = undefined,
                                       theme = undefined,
                                       style = undefined,
                                       onHeaderMove = undefined,
                                       onResizeWidth = undefined,
                                       onHeaderClick = undefined,
                                       onRowClick = undefined,
                                       onPageChange = undefined,
                                       resizable =false,
                                       draggable =false
                                   }) => {


    const [order, setOrder] = useState<string[]>(setting?.order ?? header.filter(h => h.key !== 'no' && h.key !== 'checker').map(h => h.key));
    const { checked, handleCheckboxClick, handleHeaderCheckboxClick, isThisPageAllChecked, getNestedValue } = useDataHandler(data);
    
    // hook : 칼럼 초기값 세팅
    const visibleHeaders = useHeaderHandler(header, order, setting?.hidden ?? []);

    // hook : 넓이조절 
    const { columnWidths, setColumnWidths, handleMouseDown } = useColumnWidths(
        resizable,
        visibleHeaders,
        (widths) => {
            setColumnWidths(widths);
            onResizeWidth?.(widths);
        });
    
    // hook : 칼럼 순서변경
    const { handleDragStart, allowDrop, handleDragOver } = useDragHandler(
        draggable,
        order,
        (newOrder) => {
            setOrder(newOrder);
            onHeaderMove?.(newOrder);
        },
        [columnWidths, setColumnWidths]
    );

    const [hiddens, setHiddens] = useState(setting?.hidden??[]);

    //클릭요소 저장
    const [clicked, setClicked] = useState<number | null>(null);

    // 페이지네이션 종류에 따라 테이블영역 높이 변경
    const hasPagination = usePagination === true || usePagination === 'top' || usePagination === 'bottom';
    const heightStyle = `calc(100% - ${hasPagination ? '31px' : '0px'})`;
    
    return (

        <div className={`w-full h-full border-deepGray border  ${theme ==='dot' && 'bg-lightGray bg-dots bg-dot' } `}>
            {data.length > 0 && ( page && usePagination ) && usePagination=== 'top' &&
                <Pagination page={page} onPageChange={onPageChange} direction={usePagination}/>
            }
            <div className={`no-scroll`} style={{ height: heightStyle, overflowY: 'auto' }}>

                {data?.length > 0 ?
                    <table className={`bg-white`} style={style?.body}>
                        <thead>
                        <tr >
                            {header.some(h => h.key === 'checker') &&
                                <th
                                    className={`border-deepGray border-r border-b bg-th`}
                                    style={{width: '40px', maxWidth: '40px', position: 'sticky', top: 0, zIndex: "1", ...style?.header}}
                                    onChange={handleHeaderCheckboxClick}
                                >
                                    <input type="checkbox"
                                           checked={isThisPageAllChecked()}
                                           readOnly
                                    />
                                </th>
                            }
                            {header.some(h => h.key === 'no') &&
                                <th
                                    className={`border-deepGray border-r border-b bg-th `}
                                    style={{
                                        width: '50px',
                                        fontSize: '12px',
                                        textAlign: 'center',
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: "1",
                                        ...style?.header
                                    }}
                                >
                                    <button>No</button>
                                </th>
                            }

                            {visibleHeaders
                                .map((h, i) => (
                                    <th
                                        key={`h_` + i}
                                        className="border-deepGray border-r border-b bg-th"
                                        style={{
                                            width: `${columnWidths[i]}px`,
                                            fontSize: '12px',
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: '1',
                                            ...style?.header
                                        }}
                                    >
                                        <div
                                            className={`inline-block cursor-pointer w-[calc(100%-5px)] text-left indent-2`}
                                            draggable={draggable}
                                            onDragStart={(e) => handleDragStart(e, i)}
                                            onDragOver={allowDrop}
                                            onDrop={(e) => handleDragOver(e, i)}
                                        >
                                            {h.label}
                                        </div>

                                        {resizable &&
                                            <div
                                                className="float-right w-[4px] min-h-[21px] h-full cursor-col-resize resize-handle text-gray-400"
                                                onMouseDown={(e) => handleMouseDown(e, i)}
                                            >|</div>
                                        }
                                    </th>
                                ))}
                        </tr>
                        </thead>

                        <tbody>
                        {(data.map((item, rowIndex) => (
                            <tr key={"r_" + rowIndex} className={`hover-table-row hover:bg-hover ${clicked===item.id && '!bg-clicked'}`} onClick={() =>{
                                onRowClick?.(item.id)
                                setClicked(item.id)
                            } }>
                                {header.some(h => h.key === 'checker') &&
                                    <td
                                        className={`text-center border-deepGray border-r border-b`}
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCheckboxClick(item.id);
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checked.includes(item.id)}
                                            readOnly
                                        />
                                    </td>
                                }
                                {header.some(h => h.key === 'no') &&
                                    <td
                                        className={`border-deepGray border-r border-b`}
                                        style={{width: '50px', textAlign: 'center', fontSize: '13px'}}
                                    >
                                        <button> {page
                                            ? (page.totalElements ?? 0) - ((page.currentPage ?? 0) * (page.size ?? 0) + rowIndex)
                                            : rowIndex + 1
                                        }
                                        </button>
                                    </td>
                                }

                                {visibleHeaders.map((h, i) => (
                                    <td
                                        key={`c_` + i}
                                        className={`border-deepGray border-r border-b indent-2 cursor-pointer relative`}
                                        style={{ fontSize: style?.body.fontSize ?? '12px'}} >
                                            {h.renderer
                                                ? (h.renderer(item))
                                                : getNestedValue(item, h.key)
                                            }
                                    </td>
                                ))}
                            </tr>
                        )))}
                        </tbody>
                    </table>
                    :
                    <div className="flex justify-center items-center h-full">
                        <img src={Empty} className={`w-[4rem]`}/>
                        <div className={`ml-3`}>
                            <p className={`text-2xl`}> Sorry !!</p>
                            <p className={`text-sm`}>There's nothing here.</p>
                        </div>
                    </div>
                }
            </div>

            {data.length > 0 && (page && usePagination) && (usePagination === 'bottom' || usePagination === true) &&
                <Pagination page={page} onPageChange={onPageChange} direction={usePagination}/>
            }
        </div>
    );
};
export default JsTable;