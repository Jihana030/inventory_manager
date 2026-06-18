import Inventory from "./Inventory.tsx";

export default function InventoryList() {
    return (
        <div className="inventory_list">
            <div className="component_title">재고 목록</div>
            <div className="component_body">
                <Inventory/>
                <Inventory/>
                <Inventory/>
                <Inventory/>
                <Inventory/>
                <Inventory/>
                <Inventory/>
                <Inventory/>
                <Inventory/>
                <Inventory/>
            </div>
        </div>
    )
}