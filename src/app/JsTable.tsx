import {JsTableProps} from "./type/Types";
import {FC, useState} from "react";
import {useDataHandler} from "./hook/useDataHandler";
import {useDragHandler} from "./hook/useDragHandler";
import {useHeaderHandler} from "./hook/useHeaderHandler";
import {useColumnWidths} from "./hook/useColumnWidths";
import Pagination from "./utils/Pagination";
import {useSettingPop} from "./hook/useSettingPop";
import {useCustomStyle} from "./hook/useCustomStyle";
import SettingPop from "./utils/SettingPop";
import {useHiddenHeader} from "./hook/useHiddenHeader";
import Blind from "./utils/Blind";
import Empty from "./utils/Empty";
import '../index.css';

const JsTable: FC<JsTableProps> = ({
                                       header,
                                       setting,
                                       data,
                                       page = undefined,
                                       usePagination = undefined,
                                       useSetting =false,
                                       background = undefined,
                                       theme = undefined,
                                       style = undefined,
                                       onHeaderMove = undefined,
                                       onResizeWidth = undefined,
                                       onHiddenUpdate = undefined,
                                       onRowClick = undefined,
                                       onPageChange = undefined,
                                       resizable =false,
                                       draggable =false
                                   }) => {


    const [order, setOrder] = useState<string[]>(setting?.order ?? header.filter(h => h.key !== 'no' && h.key !== 'checker').map(h => h.key));
    const { checked, handleCheckboxClick, handleHeaderCheckboxClick, isThisPageAllChecked, getNestedValue } = useDataHandler(data);

    // hook : 숨김처리
    const {
        hidden,
        hideColumn,
        showColumn,
        toggleColumn,
        setHidden
    } = useHiddenHeader(setting?.hidden ?? [], onHiddenUpdate);

    // hook : 칼럼 초기값 세팅
    const visibleHeaders = useHeaderHandler(header, order, hidden);

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

    // hook : 세팅 팝업
    const { isSettingOpen, openPopup, closePopup, togglePopup } = useSettingPop();

    // hook : 로직에 관계없는 옵션값에 따른 스타일 변화 : 테마, 배경
    const { hasPagination, heightStyle, backgroundStyle, thThemeStyle, tdThemeStyle } = useCustomStyle(usePagination, background, theme);

    // 숨김요소
    const [hiddenActive, setHiddenActive] = useState(false);


    //클릭요소 저장
    const [clicked, setClicked] = useState<number | null>(null);

    //호버요소
    const [hoveredRow, setHoveredRow] = useState<number | null>(null)

    return (

        <div
            className={`jsTable-container`}
            style={{
                padding:0,
                position:'relative',
                border:'1px solid',
                display:'inline-block',
                width:'100%',
                height:'100%',
                borderColor:'var(--deepGray)'	,
                ...backgroundStyle
            }}
        >

            {isSettingOpen &&
                <SettingPop
                    closePopup={closePopup}
                    toggleProp={{value :hiddenActive, fnc: setHiddenActive}}
                    rowHeader={header}
                    elements={hidden}
                    showColumn={showColumn}
                /> }

            {data.length > 0 && ( page && usePagination ) && usePagination=== 'top' &&
                <Pagination page={page} onPageChange={onPageChange} direction={usePagination} toggleSetting={useSetting ? togglePopup : undefined}/>
            }
            <div className={`no-scroll`} style={{ height: heightStyle, overflowY: 'auto' }}>

                {data?.length > 0 ?
                    <table style={ {borderCollapse: 'collapse', background:'white', ...style?.body} }>
                        <thead>
                        <tr >
                            {header.some(h => h.key === 'checker') &&
                                <th
                                    style={{

                                        width: '40px',
                                        maxWidth: '40px',
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: "1",
                                        ...thThemeStyle,
                                        ...style?.header}}
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
                                    style={{
                                        borderBottom: '1px solid',
                                        width: '50px',
                                        fontSize: '12px',
                                        textAlign: 'center',
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: "1",
                                        borderColor: 'var(--deepGray)'	,
                                        ...thThemeStyle,
                                        ...style?.header,
                                    }}
                                >
                                    No
                                </th>
                            }

                            {visibleHeaders
                                .map((h, i) => (
                                    <th
                                        key={`h_` + i}
                                        style={{
                                            borderBottom: '1px solid',
                                            borderColor: 'var(--deepGray)'	,
                                            width: `${columnWidths[i]}px`,
                                            fontSize: '12px',
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: '1',
                                            ...thThemeStyle,
                                            ...style?.header,
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                position: 'relative',
                                                cursor: 'pointer',
                                                width: '100%',
                                                height: '100%',
                                                textAlign: 'left',
                                                padding: '0 10px',
                                                boxSizing: 'border-box',
                                            }}

                                        >
                                            {/* 왼쪽: label */}
                                            <div
                                                style={{
                                                    display:'inline-block',
                                                    width:'calc(100% - 5px)',
                                                }}
                                                draggable={draggable}
                                                onDragStart={(e) => handleDragStart(e, i)}
                                                onDragOver={allowDrop}
                                                onDrop={(e) => handleDragOver(e, i)}
                                            >{h.label}</div>

                                            {/* 오른쪽: Blind + Resize */}
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                {hiddenActive && (
                                                    <Blind
                                                        style={{
                                                            width: "18px",
                                                            height: "18px",
                                                            border: "1px solid gray",
                                                            borderRadius: "3px",
                                                            cursor: "pointer",
                                                            background: "white",
                                                            marginRight: resizable ? "8px" : "0", // 핸들 있으면 간격
                                                        }}
                                                        onClick={() => hideColumn(h.key)}
                                                    />
                                                )}

                                                {resizable && (
                                                    <div
                                                        className="cursor-col-resize resize-handle"
                                                        style={{
                                                            width: '4px',
                                                            height: '100%',
                                                            color: 'gray',
                                                            cursor: 'col-resize',
                                                        }}
                                                        onMouseDown={(e) => handleMouseDown(e, i)}
                                                    >
                                                        |
                                                    </div>
                                                )}
                                            </div>
                                        </div>


                                    </th>
                                ))}
                        </tr>
                        </thead>

                        <tbody>
                        {(data.map((item, rowIndex) => (
                            <tr key={"r_" + rowIndex}
                                style={{
                                    background:
                                        clicked === item.id
                                            ? 'rgba(209, 234, 255, 0.73)'
                                            : hoveredRow === item.id
                                                ? '#ececec'
                                                : '',
                                }}
                                className={`hover-table-row ${clicked===item.id && 'bg-clicked'}`} onClick={() =>{
                                onRowClick?.(item.id)
                                setClicked(item.id)
                            } }>
                                {header.some(h => h.key === 'checker') &&
                                    <td
                                        style={{
                                            textAlign:'center',
                                            borderBottom:'1px solid',
                                            borderColor:'var(--deepGray)',
                                            ...tdThemeStyle,
                                            ...style?.body,
                                        }}
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
                                        style={{
                                            borderBottom: '1px solid',
                                            width: '50px',
                                            textAlign: 'center',
                                            borderColor:'var(--deepGray)'	,
                                            fontSize: '13px',
                                            ...tdThemeStyle,
                                            ...style?.body,
                                        }}
                                    >
                                        {page
                                            ? (page.totalElements ?? 0) - ((page.currentPage ?? 0) * (page.size ?? 0) + rowIndex)
                                            : rowIndex + 1
                                        }
                                    </td>
                                }

                                {visibleHeaders.map((h, i) => (
                                    <td
                                        key={`c_` + i}
                                        style={{
                                            borderBottom: '1px solid',
                                            borderColor:'var(--deepGray)',
                                            textIndent:'10px',
                                            cursor:'pointer',
                                            position:'relative',
                                            fontSize: style?.body?.fontSize ?? '12px',
                                            ...tdThemeStyle,
                                            ...style?.body,
                                            }} >
                                            {h.renderer
                                                ?  <div
                                                        style={{
                                                            position:'absolute',
                                                            top:'0px ',
                                                            height:'100%',
                                                            width:'100%'
                                                        }}
                                                    >{h.renderer(item)}</div>

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
                        <Empty style={{width:'100px', }} />
                        <div style={{marginLeft: '15px'}}>
                            <p style={{fontSize: '18px'}} > Sorry !!</p>
                            <p  style={{fontSize: '13px'}}>There's nothing here.</p>
                        </div>
                    </div>
                }
            </div>

            {data.length > 0 && (page && usePagination) && (usePagination === 'bottom' || usePagination === true) &&
                <Pagination page={page} onPageChange={onPageChange} direction={usePagination} toggleSetting={useSetting ? togglePopup : undefined}/>
            }
        </div>
    );
};
export default JsTable;