import {type FieldErrors, useForm} from "react-hook-form";
import {supabase} from "../lib/supabase.ts";
import {showErrToast, showToast} from "../lib/toast.ts";
import {uploadThumbnail} from "../services/storage.ts";
import ImageUploader from "./ImageUploader.tsx";
import CategorySelect from "./CategorySelect.tsx";
import {useEffect, useState} from "react";
import {DayPicker} from "react-day-picker";
import { ko } from 'date-fns/locale';
import {showFirstError} from "../lib/form.ts";
import type {InventoryFormType} from "../types/InventoryFormType.ts";
import type {InventoryType} from "../types/InventoryType.ts";

type Props = {
    mode:  "create" | "edit";
    item?: InventoryType;
    onClose: ()=> void;
    onSuccess: ()=>Promise<void>;
}

export default function InventoryEditor({onClose, onSuccess,mode, item}:Props) {
    const {register, handleSubmit, reset,} = useForm<InventoryFormType>();
    const [countNum, setCountNum] = useState<number>(0);
    const today = new Date();
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);

    // 저장
    const onSubmit = async (data:InventoryFormType)=>{
        try {
            // image
            if(mode === "create"){
                const imgUrl = await uploadThumbnail(data.thumbnail[0]);
                const {error} = await supabase.from('inventory').insert([
                    {
                        name: data.name,
                        option_name : data.option_name,
                        category : data.category,
                        thumbnail: imgUrl,
                        count: countNum,
                        safe_count: data.safe_count,
                        current_buy: selectedDay,
                        memo: data.memo,
                    }
                ]).select();
                if(error) {
                    console.error(error);
                    return;
                }
                await onSuccess();
                showToast("등록에 성공했습니다.")
            } else {
                let imgUrl = item?.thumbnail;
                if(data.thumbnail?.length > 0) {
                    imgUrl = await uploadThumbnail(data.thumbnail[0]);
                }
                await supabase.from('inventory').update([
                    {
                        name: item?.name,
                        option_name: item?.option_name,
                        category: item?.category,
                        thumbnail: imgUrl,
                        count: countNum,
                        safe_count: item?.safe_count,
                        current_buy: selectedDay,
                        memo: item?.memo,
                    }
                ]).eq("no",item!.no)
            }
            onClose();
            reset();

        } catch (err){
            showErrToast("등록에 실패했습니다.")
            console.error(err);
            throw err;
        }

    };

    const onInvalid = (errors:FieldErrors<InventoryFormType>) => {
        showFirstError(errors);
    };

    useEffect(() => {
        if(mode==="edit" && item){
            reset({
                name: item.name,
                option_name: item.option_name,
                category: item.category,
                count: countNum,
                safe_count: item.safe_count,
                memo: item.memo,
            })
        }
    }, [item])

    return (
        <div className="inventory_register">
            <div className="component_title">
                <h3>{mode==="create"? "제품 등록" : "제품 상세"}</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>

                <div className="component_body">
                    <div className="state_box">
                        <span>이름</span>
                        <input type="text" spellCheck={false} {...register("name", {required: "제품명을 입력해주세요.", validate: (value)=>value.trim() !== '' || "제품명을 입력해주세요."})}/>
                    </div>
                    <div className="state_box">
                        <span>옵션</span>
                        <input type="text" spellCheck={false} {...register("option_name", {required: "옵션명을 입력해주세요.", validate: (value)=>value.trim() !== '' || "제품명을 입력해주세요."})}/>
                    </div>
                    <div className="inventory_state">
                        <ImageUploader register={register} defaultImage={mode==="edit" ? item?.thumbnail : undefined}/>
                        <div>
                            <CategorySelect register={register}/>
                            <div className="state_box">
                                <span>재고 현황</span>
                                <div className="counter">
                                    <span className="material-symbols-rounded" onClick={()=>setCountNum(countNum !== 0 ? countNum - 1 : countNum)}>remove</span>
                                    <input type="number" className="counter_value" value={countNum} {...register("count", {required: "수량을 입력해주세요.", valueAsNumber: true, min:{value:1, message:"0 보다 큰 숫자를 입력하세요."}})}/>
                                    <span className="material-symbols-rounded" onClick={()=>setCountNum(countNum+1)}>add</span>
                                </div>
                            </div>
                            <div className="state_box">
                                <span>안전재고</span>
                                <div>
                                    <input type="number" {...register("safe_count", {required: "안전 재고를 입력해주세요.", valueAsNumber: true, min:{value:0, message:"0 보다 큰 숫자를 입력하세요."}})}/>
                                </div>
                            </div>
                            <div className="state_box">
                                <span>최근 구매일</span>
                                <DayPicker mode={"single"} selected={selectedDay} onSelect={setSelectedDay} locale={ko}/>
                            </div>
                        </div>
                    </div>
                    <div className="state_box">
                        <span>메모</span>
                        <textarea rows={5} {...register("memo", {required: "기타 메모를 입력해주세요."})}></textarea>
                    </div>
                </div>
                <div className="component_btn">
                    <button className="btn_y">{mode === "create" ? "저장" : "수정"}</button>
                    {mode === "edit" && (<button className="btn_r">삭제</button>)}
                    <button type="button" onClick={onClose}>닫기</button>
                </div>
            </form>
        </div>
    )
}