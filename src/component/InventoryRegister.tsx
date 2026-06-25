import {useForm} from "react-hook-form";
import type {InventoryType} from "../types/InventoryType.ts";
import {supabase} from "../lib/supabase.ts";
import {showToast} from "../lib/toast.ts";

type Props = {
    onClose: ()=> void;
}

export default function InventoryRegister({onClose}:Props) {

    const {register, handleSubmit} = useForm<InventoryType>();

    const onSubmit = async (data:InventoryType)=>{
        // image
        const file = data.thumbnail[0];
        const fileName = `${Date.now()} - ${file.name}`;
        const {error} = await supabase.storage.from('thumbnail').upload(fileName, file);
        if(error) throw error;


        await supabase.from('inventory').insert([
            {
                name: data.name,
                option_name : data.option_name,
                category : data.category,
                thumbnail: data.thumbnail,
                count: data.count,
                safe_count: data.safe_count,
                current_buy: data.current_buy,
                memo: data.memo,
            }
        ])
        if(error) {
            console.error(error);
            return;
        }

        showToast("등록에 성공했습니다.")
    };

    return (
        <div className="inventory_register">
            <div className="component_title">
                <h3><span className="material-symbols-rounded">chevron_left</span>제품 등록</h3>
            </div>
            <form className="component_body" onSubmit={handleSubmit(onSubmit)}>
                <div className="state_box">
                    <span>이름</span>
                    <input type="text" spellCheck={false} {...register("name")}/>
                </div>
                <div className="state_box">
                    <span>옵션</span>
                    <input type="text" spellCheck={false} {...register("option_name")}/>
                </div>
                <div className="inventory_state">
                    <label><input type="file" accept="image/*" {...register("thumbnail")}/><span className="material-symbols-rounded">image_search</span></label>
                    <div>
                        <select>
                            <option value="" disabled selected>카테고리</option>
                            <option value="">화장품</option>
                            <option value="">식품</option>
                            <option value="">생필품</option>
                            <option value="">기타</option>
                        </select>
                        <div className="state_box">
                            <span>재고 현황</span>
                            <div className="counter">
                                <span className="material-symbols-rounded">remove</span>
                                <input type="number" className="counter_value" value={1} {...register("count")}/>
                                <span className="material-symbols-rounded">add</span>
                            </div>
                        </div>
                        <div className="state_box">
                            <span>안전재고</span>
                            <div>
                                <input type="number" {...register("safe_count")}/>
                            </div>
                        </div>
                        <div className="current_date">
                            <span>최근 구매일</span>
                            <div>dayPicker</div>
                        </div>
                    </div>
                </div>
                <div className="state_box">
                    <span>메모</span>
                    <textarea rows={5} {...register("memo")}></textarea>
                </div>
            </form>
            <div className="component_btn">
                <button className="btn_y">저장</button>
                <button type="button" onClick={onClose}>닫기</button>
            </div>
        </div>
    )
}