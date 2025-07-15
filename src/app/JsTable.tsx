import {JsTableProps} from "./type/Types";
import {FC, useState} from "react";
import {useDataHandler} from "./hook/useDataHandler";
import {useDragHandler} from "./hook/useDragHandler";
import {useHeaderHandler} from "./hook/useHeaderHandler";
import {useColumnWidths} from "./hook/useColumnWidths";
import Pagination from "./utils/Pagination";

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
    const visibleHeaders = useHeaderHandler(header, order, setting?.hidden ?? []);
    const { columnWidths, setColumnWidths, handleMouseDown } = useColumnWidths(
        resizable,
        visibleHeaders,
        (widths) => {
            setColumnWidths(widths);
            onResizeWidth?.(widths);
        });
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



    return (

        <div className={`w-full h-full border-deepGray border  ${theme ==='dot' && 'bg-dots bg-dot' } `}>
            {( page && usePagination ) && usePagination=== 'top' &&
                <Pagination page={page} onPageChange={onPageChange} direction={usePagination}/>
            }
            <div className={`no-scroll`} style={{height:`calc(100% - ${usePagination ? '31px' : '0px' } )`, overflowY:'auto' }}>

            {data?.length > 0 ?
                <table  className={`bg-white`}>
                    <thead>
                        <tr>
                        {header.some(h => h.key === 'checker')  &&
                            <th
                                className={`border-deepGray border-r border-b bg-th`}
                                style={{width: '40px', maxWidth: '40px',position: 'sticky', top: 0, zIndex:"1"}}
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
                                style={{width: '50px', fontSize:'12px', textAlign:'center', position: 'sticky',top: 0, zIndex:"1"}}
                            >
                                <button>No</button>
                            </th>
                        }

                        {visibleHeaders
                            .map((h,i) => (
                                <th
                                    key={`h_` + i}
                                    className="border-deepGray border-r border-b bg-th"
                                    style={{
                                        width: `${columnWidths[i]}px`,
                                        fontSize: '12px',
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: '1',
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
                        <tr key={"r_"+rowIndex} onClick={()=>onRowClick?.(item.id)}>
                            {header.some(h => h.key === 'checker')  &&
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
                            {header.some(h => h.key === 'no')  &&
                                <td
                                    className={`border-deepGray border-r border-b`}
                                    style={{width: '50px', textAlign:'center', fontSize:'13px'}}
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
                                    key={`c_`+i}
                                    className={`border-deepGray border-r border-b indent-2`}  style={h.style}>
                                    <button className={`truncate`}>
                                        {getNestedValue(item, h.key)}
                                    </button>
                                </td>
                            ))}
                        </tr>
                    )))}
                    </tbody>
                </table>
                :
                <>테이터가 없습니다</>
            }
            </div>

            {( page && usePagination ) && usePagination !== 'top' &&
               <Pagination page={page} onPageChange={onPageChange} direction={usePagination}/>
            }
        </div>
    );
};
export default JsTable;