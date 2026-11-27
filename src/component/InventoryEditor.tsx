import {type FieldErrors, useForm, useWatch} from "react-hook-form";
import {supabase} from "../lib/supabase.ts";
import {showErrToast, showToast} from "../lib/toast.ts";
import {getThumbnailUrl, uploadThumbnail} from "../services/storage.ts";
import ImageUploader from "./ImageUploader.tsx";
import CategorySelect from "./CategorySelect.tsx";
import {useEffect, useRef} from "react";
import {DayPicker} from "react-day-picker";
import { ko } from 'date-fns/locale';
import {showFirstError} from "../lib/form.ts";
import type {InventoryFormType} from "../types/InventoryFormType.ts";
import type {InventoryType} from "../types/InventoryType.ts";
import {toast} from "react-toastify";
import {InventoryRestored} from "../services/inventoryRestored.ts";

type Props = {
    mode:  "create" | "edit";
    item?: InventoryType;
    onClose: ()=> void;
    onSuccess: ()=>Promise<void>;
}

export default function InventoryEditor({onClose, onSuccess,mode, item}:Props) {
    const {register, handleSubmit, reset, control, setValue, getValues} = useForm<InventoryFormType>({
        defaultValues: {
            count : 0,
            current_buy : mode === "edit" ? new Date(item?.current_buy ?? "") : new Date(),
        },
    });
    const count = useWatch({
        control,
        name: "count",
    });
    const currentBuy = useWatch({
        control,
        name: "current_buy",
    })

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
                        count: data.count,
                        safe_count: data.safe_count,
                        current_buy: data.current_buy,
                        memo: data.memo,
                    }
                ]).select();
                if(error) {
                    console.error(error);
                    return;
                }
                await onSuccess();
                showToast("등록에 성공했습니다.");
            } else {
                let imgUrl = item?.thumbnail;
                if(data.thumbnail?.length > 0) {
                    imgUrl = await uploadThumbnail(data.thumbnail[0]);
                }
                await supabase.from('inventory').update([
                    {
                        name: data.name,
                        option_name: data.option_name,
                        category: data.category,
                        thumbnail: imgUrl,
                        count: data.count,
                        safe_count: data.safe_count,
                        current_buy: data.current_buy,
                        memo: data.memo,
                    }
                ]).eq("no",item!.no).select();
                await onSuccess();
                showToast('수정에 성공했습니다.');
            }
            onClose();
            reset();

        } catch (err){
            showErrToast("관리에 실패했습니다.")
            console.error(err);
            throw err;
        }
    };

    // 삭제 (6개월 후 삭제)
    const onDelete = async () => {
        if (!item) return;

        const {no} = item;
        const deletedAt = new Date().toISOString();
        const {data, error} = await supabase.from('inventory')
            .update({deleted_at: deletedAt})
            .eq('no', no)
            .is('deleted_at', null)
            .select('no')
            .maybeSingle();
        if (error || !data) {
            if (error) console.error(error);
            showErrToast('재고 삭제에 실패했습니다.');
            return;
        }

        dialogRef.current?.close();
        onClose();
        toast.success(({closeToast}) => (
            <div className='restored_toast'>
                재고가 삭제되었습니다.
                <button type="button" onClick={async () => {
                  const restored = await InventoryRestored({no, deletedAt});
                    if (!restored) return;
                    await onSuccess();
                    closeToast();
                }}>복원하기</button>
            </div>
        ), {autoClose: 8000, closeOnClick: false});
        await onSuccess();
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
                count: item.count,
                safe_count: item.safe_count,
                memo: item.memo,
            })
        }
    }, [item, mode, reset])

    const dialogRef = useRef<HTMLDialogElement>(null);

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
                        <div className="image_box">
                            <ImageUploader register={register} mode={mode} defaultImage={mode==="edit" && item ? getThumbnailUrl(item.thumbnail) : undefined}/>
                            <div className="descript">
                                최대 5MB 가능
                            </div>
                        </div>
                        <div>
                            <CategorySelect register={register} getValues={getValues} setValue={setValue}/>
                            <div className="state_box">
                                <span>재고 현황</span>
                                <div className="counter">
                                    <span className="material-symbols-rounded" onClick={()=>setValue('count',Math.max(0, count - 1))}>remove</span>
                                    <input type="number" className="counter_value" {...register("count", {required: "수량을 입력해주세요.", valueAsNumber: true, min:{value:1, message:"0 보다 큰 숫자를 입력하세요."}})}/>
                                    <span className="material-symbols-rounded" onClick={()=>setValue("count", count + 1)}>add</span>
                                </div>
                            </div>
                            <div className="state_box">
                                <span>안전재고</span>
                                <div>
                                    <input type="number" defaultValue={0} {...register("safe_count", {required: "안전 재고를 입력해주세요.", valueAsNumber: true, min:{value:0, message:"0 보다 큰 숫자를 입력하세요."}})}/>
                                </div>
                            </div>
                            <div className="state_box">
                                <span>최근 구매일</span>
                                <DayPicker mode={"single"} selected={currentBuy} onSelect={(date)=>setValue("current_buy", date)} locale={ko}/>
                            </div>
                        </div>
                    </div>
                    <div className="state_box">
                        <span>메모</span>
                        <textarea rows={5} {...register("memo")}></textarea>
                    </div>
                </div>
                <div className="component_btn">
                    <button type={"submit"} className="btn_y">{mode === "create" ? "저장" : "수정"}</button>
                    {mode === "edit" && (<button className="btn_r" type={"button"} onClick={()=> dialogRef.current?.showModal()}>삭제</button>)}
                    <button type="button" onClick={onClose}>닫기</button>
                </div>
              <dialog ref={dialogRef} className='alert_dialog'>
                <div className='dialog_header'>
                  <span className='material-symbols-rounded' onClick={()=>dialogRef.current?.close()}>close</span>
                </div>
                <div className='dialog_body'>
                  <p className='alert_title'>물건을 삭제할까요?</p>
                  <p className='alert_subtitle'>선택한 물건이 재고목록에서 삭제됩니다.</p>
                </div>
                <div className='dialog_footer'>
                  <button className='btn_r' type={"button"} onClick={()=>onDelete()}>삭제하기</button>
                  <button type={"button"}  onClick={()=>dialogRef.current?.close()}>닫기</button>
                </div>
              </dialog>
            </form>
        </div>
    )
}
