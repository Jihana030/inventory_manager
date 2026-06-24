import Inventory from "./Inventory.tsx";
import SideMenu from "./SideMenu.tsx";

export default function InventoryList() {
    return (
        <div className="inventory_list">
            <div className="component_title">
                <h3>재고 목록</h3>
                <SideMenu/>
            </div>
            <div className="component_body">
                <Inventory/>
            </div>
        </div>
    )
}