import {FC, useState} from "react";
import {Page} from "../type/Types";
import Lefter from "./Lefter";
import Righter from "./Righter";


interface PaginationProps {
    page: Page;
    direction?:boolean | string;
    onPageChange?: (clickPage: number) => void;
}

const Pagination: FC<PaginationProps > = ({ page, onPageChange, direction }) =>{

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
        <div className={`h-[30px]  ${ direction && direction !=='top' ? 'border-t' : (direction ==='top' ? 'border-b':'') } bg-gray-50  border-deepGray p-[6px]  line-h-20`}>
            <div className={`flex`}>
                <Lefter onClick={()=>handleButtonClick( inputValue - 1)} />
                <div className={`flex mx-1.5`}>
                    <input type={'number'} className={`border rounded border-deepGray w-[40px] h-[20px] text-right text-[12px] mr-1.5`}
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
                    <p className={`select-none h-[20px] text-[13px]`}>/ {page.totalPages}</p>
                </div>

                <Righter  onClick={()=>handleButtonClick( inputValue + 1)} />

                <div className={`text-[13px] ml-auto mr-3 flex`}>
                    <p>total</p> <p className={`splice mx-2 border-l border-deepGray`}></p> <p>{page.totalElements}</p>
                </div>
            </div>
        </div>
    )
}
export default Pagination;