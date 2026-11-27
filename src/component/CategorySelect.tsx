import {useEffect, useState} from "react";
import type {Categories} from "../types/Categories.ts";
import {supabase} from "../lib/supabase.ts";
import type {UseFormGetValues, UseFormRegister, UseFormSetValue} from "react-hook-form";
import type {InventoryFormType} from "../types/InventoryFormType.ts";

type Props = {
    register : UseFormRegister<InventoryFormType>;
    getValues: UseFormGetValues<InventoryFormType>;
    setValue: UseFormSetValue<InventoryFormType>;
}

export default function CategorySelect({register, getValues, setValue}:Props){
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

  useEffect(() => {
    const firstCategory = category[0];
    if (!firstCategory) return;

    const currentCategory = getValues('category');
    setValue('category', String(currentCategory || firstCategory.id));
  }, [category, getValues, setValue]);

    return (
        <select {...register("category", {required: "카테고리를 선택해주세요."})}>
            {category.map((cate)=> (
                <option key={cate.id} value={cate.id}>{cate.name}</option>
            ))}
        </select>
    )
}