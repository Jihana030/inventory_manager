import type {InventoryType} from "../types/InventoryType.ts";


type Props = {
    item: InventoryType;
    onDetail: (item:InventoryType)=>void;
}

export default function Inventory({item, onDetail}:Props) {
    const imgUrl = item.thumbnail;
    console.log(item.thumbnail[0])
    return (
        <div className="inventory" onClick={()=> onDetail(item)}>
            {
                item.count > item.safe_count ? (
                    <div className="inventory_state">{item.count}개</div>
                ) : (
                    <div className="inventory_state immer">
                        <span className="material-symbols-rounded">error</span>
                        재고 주의
                    </div>
                )
            }
            {
                item ? (
                    <div className="inventory_thumbnail">
                        <img src={imgUrl} alt="thumbnail"/>
                        <p className="inventory_info">
                            <span className="title">{item.name}</span>
                            <span className="option">{item.option_name}</span>
                        </p>
                    </div>
                ): (
                    <div className="inventory_thumbnail">
                        <img src="http://localhost:5173/src/assets/back_bg.png" alt="thumbnail"/>
                        <p className="inventory_info">
                            <span className="title">재고를 등록해보세요</span>
                        </p>
                    </div>
                )
            }
        </div>
    )
}