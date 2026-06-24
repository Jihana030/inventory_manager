import Inventory from "./Inventory.tsx";
import SideMenu from "./SideMenu.tsx";
import {useState} from "react";

type Props={
    items: [];
}

export default async function InventoryList({items}:Props) {

    console.log(items);
    const [listState, setListState] = useState<number>(0);
    setListState(items.length);

    return (
        <div className="inventory_list">
            <div className="component_title">
                <h3>재고 목록</h3>
                <SideMenu/>
            </div>
            <div className="component_body">
                <Inventory />
            </div>
        </div>
    )
}