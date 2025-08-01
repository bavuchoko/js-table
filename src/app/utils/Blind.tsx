import React, {FC} from "react";
import {ClickProps} from "../type/Types";



const Blind:FC<ClickProps> = ({onClick,style}) => {

    return (
        <svg onClick={onClick} style={style} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48">
            <title>accessibility-blind-solid</title>
            <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                    <rect width="48" height="48" fill="none"/>
                </g>
                <g id="Q3_icons" data-name="Q3 icons">
                    <g>
                        <path d="M45.3,22.1C43.2,19.5,35.4,11,24,11a23,23,0,0,0-8.5,1.6L9.7,6.9A2,2,0,0,0,6.9,9.7L18.6,21.4A5.9,5.9,0,0,1,24,18a6,6,0,0,1,2.6,11.4L38.3,41.1a2,2,0,1,0,2.8-2.8l-4.8-4.8a31.4,31.4,0,0,0,9-7.6A3,3,0,0,0,45.3,22.1Z"/>
                        <path d="M10.4,17.6a2,2,0,0,0-2.8,2.8l15,15a2,2,0,0,0,2.8-2.8Z"/>
                        <path d="M5.4,22.6a1.9,1.9,0,0,0-2.8,0,1.9,1.9,0,0,0,0,2.8l7,7a2,2,0,0,0,2.8-2.8Z"/>
                    </g>
                </g>
            </g>
        </svg>
    )
}
export default Blind;