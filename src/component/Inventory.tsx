export default function Inventory() {
    return (
        <div className="inventory">
            <div className="inventory_state"></div>
            {/*<div className="inventory_state immer">*/}
            {/*    <span className="material-symbols-rounded">error</span>*/}
            {/*    재고 주의*/}
            {/*</div>*/}
            <div className="inventory_thumbnail">
                <img src="http://localhost:5173/src/assets/back_bg.png" alt="thumbnail"/>
                {/*<img src="https://images.pexels.com/photos/9656151/pexels-photo-9656151.jpeg" alt="thumbnail"/>*/}
                <p className="inventory_info">
                    <span className="title">재고를 등록해보세요</span>
                    <span className="option"></span>
                </p>
            </div>
        </div>
    )
}