import type {InventoryType} from "../types/InventoryType.ts";
import CategorySelect from "./CategorySelect.tsx";
import {DayPicker} from "react-day-picker";
import {ko} from "date-fns/locale";
import {useState} from "react";

type Props = {
    item: InventoryType;
    onClose: ()=> void;
}
export default function InventoryDetail({onClose, item}:Props) {
    const imageUrl = item.thumbnail;
    const currentBuy:string = item.current_buy;
    const buyDate:Date = new Date(currentBuy);
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(buyDate);

    return (
        <div className="inventory_detail dis_none">
            {/* 닫기 필요 */}
            <div className="component_title">
                <h3>제품 상세<span className="material-symbols-rounded" title="닫기" onClick={onClose}>close</span></h3>
            </div>
            <div className="component_body">
                <div className="inventory_thumbnail">
                    <img src={imageUrl} alt="thumbnail"/>
                    <div className="inventory_info">
                       <CategorySelect />
                        <div>
                            <label className="title"><input type="text" value={item.name}/></label>
                            <label className="option"><input type="text" value={item.option_name}/></label>
                        </div>
                    </div>
                </div>
                <div className="state_box">
                    <span>안전재고</span>
                    <div>
                        <input type="number" value={item.safe_count}/>
                    </div>
                </div>
                <div className="state_box">
                    <span>재고 현황</span>
                    <div className="counter">
                        <span className="material-symbols-rounded">remove</span>
                        <input type="number" className="counter_value" value={item.count}/>
                        <span className="material-symbols-rounded">add</span>
                    </div>
                </div>
                <div className="state_box">
                    <span>최근 구매일</span>
                    <DayPicker mode={"single"} selected={selectedDay} onSelect={setSelectedDay} locale={ko}/>
                </div>
                <div className="state_box">
                    <span>메모</span>
                    <textarea rows={5} spellCheck={false}>{item.memo}</textarea>
                </div>
            </div>
            <div className="component_btn">
                <button className="btn_y">수정</button>
                <button className="btn_r">삭제</button>
            </div>
        </div>
    )
}