import {useState} from "react";

export function useSettingPop() {
    const [isSettingOpen, setIsSettingOpen] = useState(false);

    const openPopup = () => setIsSettingOpen(true);
    const closePopup = () => setIsSettingOpen(false);
    const togglePopup = () => setIsSettingOpen(prev => !prev);

    return { isSettingOpen, openPopup, closePopup, togglePopup };
}