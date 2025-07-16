import Eye from '../resource/icon/eye.png'
import Blind from '../resource/icon/blind.png'
import ToggleSwitch from "./ToggleSwitch";


const SettingPop =()=>{
    return (
        <div className={`absolute  p-3 bg-gray-50 z-50 top-1/2 left-1/2 border flex shadow-strong`} >
            <div className={`mr-5`}>
                    <img src={Eye} alt="Eye" className={`w-[20px] h-[20px] mb-5`}/>
                    <img src={Blind} alt="Eye" className={`w-[20px] h-[20px] `}/>
            </div>
            <div className={``}>
                <div className={` mt-[-2px] mb-5`}> <ToggleSwitch /></div>
                <div>a</div>
            </div>

        </div>
    )
}
export default SettingPop;