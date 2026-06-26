import {useEffect, useState} from "react";
import type {Categories} from "../types/Categories.ts";
import {supabase} from "../lib/supabase.ts";
import type {UseFormRegister} from "react-hook-form";
import type {InventoryType} from "../types/InventoryType.ts";

type Props = {
    register : UseFormRegister<InventoryType>;
}

export default function CategorySelect({register}:Props){
    // category
    const [category, setCategory] = useState<Categories[]>([]);

    useEffect(()=>{
        const fetchCategory = async ()=>{
            const {data, error} = await supabase.from('category').select('*').order('name');

            if(error) {
                console.error(error);
                return;
            }

            setCategory(data);
        };
        fetchCategory();
    }, [])

    return (
        <select {...register("category", {required: "카테고리를 선택해주세요."})}>
            <option value="" disabled selected>카테고리</option>
            {category.map((cate)=> (
                <option key={cate.id} value={cate.id}>{cate.name}</option>
            ))}
        </select>
    )
}