
import ToggleSwitch from "./ToggleSwitch";
import {FC, useEffect, useRef} from "react";
import {Header} from "../type/Types";
import Eye from "./Eye";
import Blind from "./Blind";

export type ToggleProp ={
    value:boolean;
    fnc: (value :boolean) => void;
}

type SettingPopProps = {
    closePopup: () => void;
    toggleProp: ToggleProp;
    rowHeader: Header[];
    elements?: string[];
    showColumn?: (key: string) => void;
};

const SettingPop: FC<SettingPopProps> =({closePopup, toggleProp, rowHeader=[], elements=[], showColumn })=>{
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                closePopup();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closePopup]);

    return (
        <>
            <div
                style={{
                    width:'100%',
                    height:'100%',
                    position:'absolute',
                    top:'0',
                    zIndex:'40',
                    background:'var(--glass)',
                }}></div>
            <div
                ref={popupRef}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',

                    backgroundColor: 'white',
                    zIndex: 50,
                    border: '1px solid #000000',
                    boxShadow: '-2px 4px 8px rgba(0, 0, 0, 0.2)',
                }}
                 >
                <div style={{marginBottom:'20px', fontSize:'13px', padding:'10px 20px 0 10px'} }>
                    <p style={{fontSize:'13px', fontWeight:'bold'}}>설정</p>
                    ----------
                    <p style={{fontSize:'12px'}}>특정 칼럼을 표시 제외하거나 추가합니다.</p>
                </div>
                
                <div style={{width:'calc(100% - 32px)'}}>
                    <div style={{
                        background:'var(--lightGray)',
                        padding:'5px 15px',
                        marginBottom:'15px',
                        marginLeft:'1px',
                        alignItems: 'center',
                        width:'100%'
                    }}>
                        <Eye style={{width:"20px", height:"20px", marginTop:'3px'}} />
                        <div  style={{
                            marginTop:'2px',
                            float:'right'
                        }}> <ToggleSwitch  {...toggleProp} /></div>
                    </div>

                    <div style={{
                        padding:'5px 15px',
                        marginBottom:'15px',
                        marginLeft:'1px',
                        alignItems: 'flex-start',
                        width:'100%',
                        display:'flex'
                    }}>
                        <Blind style={{
                            borderRight:'1px solid',
                            width:"20px", height:"20px", marginTop:'3px', paddingRight:'10px', marginRight:'10px',
                            borderColor:'var(--deepGray)',}} />
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                                gap: '0.75rem',
                                backgroundColor: 'white',
                            }}
                        >
                            {elements.map(el => {
                                const matched = rowHeader.find(h => h.key === el);
                                return (
                                    <p
                                        key={el}
                                        style={{
                                            position: 'relative',
                                            display: 'inline-block',
                                            textAlign: 'center',
                                            fontSize: '12px',
                                            paddingTop: '2px',
                                            paddingBottom: '2px',
                                            minWidth: '40px',
                                            paddingLeft: '8px',
                                            paddingRight: '8px',
                                            borderRadius: '1rem',
                                            backgroundColor: 'white',
                                            marginTop:'5px',
                                            color: '#1f2937',
                                            fontWeight: 'bold',
                                            cursor:'pointer'
                                        }}

                                        onClick={() => showColumn?.(el)}
                                    >
                                        {matched?.label ?? el}
                                        <span
                                            style={{
                                                position: 'absolute',
                                                top: '-2px',
                                                right: '-6px',
                                                width: '14px',
                                                height: '14px',
                                                fontSize: '11px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#f87171',
                                                color: 'white',
                                                borderRadius: '9999px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                        ×
                                      </span>
                                    </p>
                                );
                            })}
                            {elements.length <1 && <span style={{fontSize:'13px'}}> empty </span>}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default SettingPop;