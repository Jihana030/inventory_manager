import backBg from "../assets/back_bg.png";
import {supabase} from "../lib/supabase.ts";
import type {InventoryType} from "../types/InventoryType.ts";
import {InventoryRestored} from "../services/inventoryRestored.ts";
import {useState} from "react";

type Props = {
  ref: React.RefObject<HTMLDialogElement | null>;
  item?: InventoryType;
}

export default function InventoryTrash({ref: trashDialog, item } : Props) {
  const {no} = item;
  const deletedAt = new Date().toISOString();
  const [isLoading, setIsLoading] = useState(true);

  async function getInventory(){
    try {
      const { data, error } = await supabase
        .from("inventory")
        .select("no, name, option_name, deleted_at")
        .not("deleted_at", "is", null)
        .order("deleted_at", { ascending: false });

      if(error){
        console.error(error);
        setIsLoading(false);
        return;
      }
    } catch (err){
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <dialog ref={trashDialog}>
      <div className='dialog_header'>
        <p className='dialog_title'>휴지통</p>
        <span className='material-symbols-rounded' onClick={()=>trashDialog.current?.close()}>close</span>
      </div>
      <div className='dialog_body'>
        <div className='trash_box'>
          <ul>
            <li className='trash_item'>
              <div className='trash_item_info'>
                <img src={backBg} alt=""/>
                <div className='trash_item_info_text'>
                  <p className='item_name'>제품명</p>
                  <p className='item_option'>옵션명</p>
                </div>
              </div>
              <button type="button"  onClick={async () => {
                const restored = await InventoryRestored({no, deletedAt});
                if (!restored) return;
                await onSuccess();
                closeToast();
              }} >복원하기</button>
            </li>
          </ul>
        </div>
      </div>
      <div className='dialog_footer'>
        <button type={"button"}  onClick={()=>trashDialog.current?.close()}>닫기</button>
      </div>
    </dialog>
  )
}