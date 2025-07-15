import {FC} from "react";
import {Page} from "./type/Types";


const pagination: FC<Page> = ({
                                  currentPage = 0,
                                  totalElements = 0,
                                  totalPages = 0
                              }: Page) =>{

    return(
        <div className={`h-[34px]  border-t border-deepGray p-[5px]`}>
            <input type={'number'} className={`border border-deepGray w-[50px] h-[24px]`}/>
        </div>
    )
}
export default pagination;