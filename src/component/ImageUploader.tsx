import {useEffect, useState} from "react";
import {type UseFormRegister} from "react-hook-form";
import type {InventoryFormType} from "../types/InventoryFormType.ts";

type Props = {
    register : UseFormRegister<InventoryFormType>;
    defaultImage?:string;
    mode?:string;
}

export default function ImageUploader({register, defaultImage, mode}:Props){
    // 이미지 미리보기
    const [preview, setPreview] = useState<string>();
    const imageSrc = preview ?? defaultImage;

    useEffect(()=>{
        return ()=>{
            if(preview && preview.startsWith("blob:")) {
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
                    if(preview && preview.startsWith("blob:")){
                        URL.revokeObjectURL(preview);
                    }
                    const nextPreview = URL.createObjectURL(file);
                    setPreview(nextPreview);
                }
                , required: mode === "create" ? "이미지를 첨부해주세요." : false})}/>
            <span className="material-symbols-rounded">image_search</span>
            {imageSrc && (<img src={imageSrc} alt="미리보기"/>)}
        </label>
    )
}