import {supabase} from "../lib/supabase.ts";
import {showErrToast} from "../lib/toast.ts";
import type {InventoryType} from "../types/InventoryType.ts";

type Props = {
  deletedAt: string;
   no: InventoryType['no'];
}

export async function InventoryRestored({no, deletedAt}:Props){
  const {data, error} = await supabase.from('inventory')
    .update({deleted_at: null})
    .eq('no', no)
    .eq('deleted_at', deletedAt)
    .select('no')
    .maybeSingle();
  if (error || !data) {
    if (error) console.error(error);
    showErrToast('재고 복원에 실패했습니다.');
    return false;
  }
  return true;
}