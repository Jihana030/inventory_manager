import Inventory from "./Inventory.tsx";
import type {InventoryType} from "../types/InventoryType.ts";
import backBg from  "../assets/back_bg.png";
import type {SortType} from "../types/SortType.ts";

type Props = {
    onAdd: ()=>void;
    onDetail: (item:InventoryType) => void;
    inventoryList : InventoryType[];
    isLoading: boolean;
    sort: SortType;
    onSortChange:(sort:SortType)=>void;
};

export default function InventoryList({onAdd, onDetail, inventoryList, isLoading, sort, onSortChange}:Props) {

    return (
        <div className="inventory_list">
            <div className="component_title">
                <div className="list_sort">
                    <h3>재고 목록</h3>
                    <div>
                        <select value={sort} onChange={e=>onSortChange(e.target.value as SortType)}>
                            <option value="warning">안전재고순</option>
                            <option value="name">이름순</option>
                            <option value="buy">최신구매순</option>
                        </select>
                    </div>
                </div>
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
                            <img src={backBg} alt="thumbnail"/>
                            <p className="inventory_info">
                                <span className="title">재고를 등록해보세요</span>
                            </p>
                        </div>
                    </div>
                ) : (
                    inventoryList.map(item => (
                        <Inventory key={item.no} item={item} onDetail={onDetail}/>
                    ))
                )}

            </div>
        </div>
    )
}