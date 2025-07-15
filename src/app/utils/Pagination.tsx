import {FC} from "react";
import {Page} from "../type/Types";


interface PaginationProps {
    page: Page;
}

const pagination: FC<PaginationProps > = ({ page }) =>{

    return(
        <div className={`h-[30px]  border-t border-deepGray p-[6px]  line-h-20`}>
            <div className={`flex`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`cursor-pointer`} fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
                    <path d="M11.3,12l3.5-3.5c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-4.2,4.2l0,0c-0.4,0.4-0.4,1,0,1.4l4.2,4.2c0.2,0.2,0.4,0.3,0.7,0.3l0,0c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L11.3,12z"/>
                </svg>
                <div className={`flex mx-1.5`}>
                    <input type={'number'} className={`border rounded border-deepGray w-[40px] h-[20px] text-right text-[12px] mr-1.5`} value={2}/>
                    <p className={`select-none h-[20px] text-[13px]`}>/ {page.totalPages}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg"  className={`cursor-pointer`} fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
                    <g transform="rotate(180, 12, 12)">
                    <path d="M11.3,12l3.5-3.5c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-4.2,4.2l0,0c-0.4,0.4-0.4,1,0,1.4l4.2,4.2c0.2,0.2,0.4,0.3,0.7,0.3l0,0c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L11.3,12z"/>
                    </g>
                </svg>

                <div className={`text-[13px] ml-auto mr-3 flex`}>
                    <p>total</p> <p className={`splice mx-2 border-l border-deepGray`}></p> <p>{page.totalElements}</p>
                </div>
            </div>
        </div>
    )
}
export default pagination;