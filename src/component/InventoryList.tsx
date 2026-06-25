import Inventory from "./Inventory.tsx";
import {supabase} from "../lib/supabase.ts";
import {useEffect, useState} from "react";
import type {InventoryType} from "../types/InventoryType.ts";

type Props = {
    onAdd: ()=>void;
    onDetail: ()=>void;
};

export default function InventoryList({onAdd, onDetail}:Props) {
    const [inventoryList, setInventoryList] = useState<InventoryType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        getInventory();
    }, [])

    async function getInventory(){
        try {
            const { data } = await supabase.from("inventory").select("*");
            setInventoryList(data ?? []);
        } catch (err){
            console.error(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="inventory_list">
            <div className="component_title">
                <h3>재고 목록</h3>
                <div className="side_menu" onClick={onAdd}>
                    <span className="material-symbols-rounded" title="등록">add_circle</span>
                </div>
            </div>
            <div className="component_body">
                {isLoading ? (
                    <p>불러오는 중...</p>
                ) : inventoryList.length === 0 ? (
                    <div className="inventory">
                        <div className="inventory_state">0개</div>
                        <div className="inventory_thumbnail">
                            <img src="http://localhost:5173/src/assets/back_bg.png" alt="thumbnail"/>
                            <p className="inventory_info">
                                <span className="title">재고를 등록해보세요</span>
                            </p>
                        </div>
                    </div>
                ) : (
                    inventoryList.map(item => (
                        <Inventory key={item.id} item={item} onDetail={onDetail}/>
                    ))
                )}

            </div>
        </div>
    )
}