export default function Inventory() {
    return (
        <div className="inventory">
            <div className="inventory_state">3개</div>
            {/*<div className="inventory_state immer">*/}
            {/*    <span className="material-symbols-rounded">error</span>*/}
            {/*    재고 주의*/}
            {/*</div>*/}
            <div className="inventory_thumbnail">
                <img src="https://images.pexels.com/photos/8166452/pexels-photo-8166452.jpeg" alt="thumbnail"/>
                <p className="inventory_info">
                    <span className="title">제품 이름</span>
                    <span className="option">제품 옵션</span>
                </p>
            </div>
        </div>
    )
}