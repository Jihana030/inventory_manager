import {useEffect, useState} from "react";
import {type UseFormRegister} from "react-hook-form";
import type {InventoryType} from "../types/InventoryType.ts";

type Props = {
    register : UseFormRegister<InventoryType>;
}

export default function ImageUploader({register}:Props){
    // 이미지 미리보기
    const [preview, setPreview] = useState<string>("");

    useEffect(()=>{
        return ()=>{
            if(preview) {
                URL.revokeObjectURL(preview);
            }
        }
    }, [preview]);
    return (
        <label>
            <input type="file" accept="image/*" {...register("thumbnail", {
                onChange: (e)=> {
                    const file = e.target.files?.[0];
                    if(!file) return;
                    if(preview){
                        URL.revokeObjectURL(preview);
                    }
                    const nextPreview = URL.createObjectURL(file);
                    setPreview(nextPreview);
                }
                , required: "이미지를 첨부해주세요."})}/>
            <span className="material-symbols-rounded">image_search</span>
            {preview && (<img src={preview} alt="미리보기"/>)}
        </label>
    )
}