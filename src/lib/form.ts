import type {FieldErrors, FieldValues} from "react-hook-form";
import {showErrToast} from "./toast.ts";

export function showFirstError<T extends FieldValues>(errors: FieldErrors<T>) {
    const firstError = Object.values(errors)[0];

    if(firstError?.message){
        showErrToast(firstError.message.toString());
    }
}