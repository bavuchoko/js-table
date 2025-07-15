import {FC} from "react";
import {Page} from "../type/Types";

interface PaginationProps {
    page: Page;
}

const pagination: FC<PaginationProps > = ({ page }) =>{

    return(
        <div className={`h-[30px]  border-t border-deepGray p-[6px] flex line-h-20`}>
            <button className={`w-[25px] bg-amber-100 mr-1 h-[20px]`} > s </button>
            <input type={'number'} className={`border border-deepGray w-[40px] h-[20px] text-[12px] mr-1.5 indent-1`} value={2}/>
            <p className={` h-[20px] text-[13px]`}>/ {page.totalPages}</p>
            <button className={`w-[25px] bg-amber-200 ml-1 h-[20px]`} > n </button>
        </div>
    )
}
export default pagination;