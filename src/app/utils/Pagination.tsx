import {FC, useState} from "react";
import {Page} from "../type/Types";
import Lefter from "./Lefter";
import Righter from "./Righter";
import SettingIcon from "./SettingIcon";

interface PaginationProps {
    page: Page;
    direction?:boolean | string;
    onPageChange?: (clickPage: number) => void;
    toggleSetting?: () => void;
}

const Pagination: FC<PaginationProps > = ({ page, onPageChange, direction, toggleSetting }) =>{

    const [inputValue, setInputValue] = useState((page.currentPage ?? 0) + 1);

    const onPageHandler = (value: number) => {
        onPageChange?.(value - 1);
    };

    const handleButtonClick =(val:number)=>{
        if(val < 1) return;
        if(inputValue == (page.totalPages ?? 1) && val > (page.totalPages ?? 1)) return;
        if(val >  (page.totalPages ?? 1)) val = (page.totalPages ?? 1)
        onPageHandler(inputValue);
        setInputValue(val);
    }

    const handleInputChange = (val:number) => {
        if(val < 1) return;
        if(val>  (page.totalPages ?? 1)) val = (page.totalPages ?? 1)
        setInputValue(val);
    };

    const handleInputBlur = () => {
        onPageHandler(inputValue);
    };



    return(
        <div
            style={{
                height:"30px",
                borderTop: `${ direction && ( direction ==='bottom'|| direction === true ) ? '1px solid' : 'none'}`,
                borderBottom: `${ direction && direction ==='top' ? '1px solid' : 'none' }`,
                backgroundColor: 'var(--lightGray)'	,
                borderColor: 'var(--deepGray)'	,
                padding :'6px',
                lineHeight:'20px',
            }}
            >
            <div style={{display:'flex'}}>
                <Lefter onClick={()=>handleButtonClick( inputValue - 1)} />
                <div style={{display:'flex', marginLeft:'10px', marginRight:'15px'}} >
                    <input type={'number'}
                           style={{
                               border:'1px solid',
                               borderRadius:'3px',
                               borderColor:'var(--deepGray)'	,
                               textAlign:'right',
                               fontSize:'12px',
                               marginRight:'15px',
                               width:'40px',
                               height:'20px',
                               boxSizing:'border-box'
                           }}
                           onChange={(e)=>handleInputChange(Number(e.target.value))}
                           value={inputValue}
                           onFocus={(e) => e.target.select()}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                   (e.target as HTMLInputElement).blur();
                               }
                           }}
                           onBlur={handleInputBlur}
                    />
                    <p style={{userSelect:'none',  fontSize:'13px', height:'20px'}} >/ {page.totalPages}</p>
                </div>

                <Righter  onClick={()=>handleButtonClick( inputValue + 1)} />

                {toggleSetting &&
                <SettingIcon style={{width:"20px", height:"20px", marginLeft:"10px", cursor:"pointer"}} onClick={toggleSetting}/>
                }

                <div style={{userSelect:'none', display:'flex', fontSize:'13px', marginLeft:'auto', marginRight:'30px'}} >
                    <p>total</p> <p style={{marginLeft:'5px', marginRight:'5px', borderLeft:'1px solid', borderColor:'var(--deepGray)'	}} ></p> <p>{page.totalElements}</p>
                </div>

            </div>
        </div>
    )
}
export default Pagination;