
export default function InventoryDetail(){
    return (
        <div className="inventory_detail dis_none">
            {/* 닫기 필요 */}
            <div className="component_title"><h3>제품 상세</h3></div>
            <div className="component_body">
                <div className="inventory_thumbnail">
                    <img src="https://images.pexels.com/photos/8166452/pexels-photo-8166452.jpeg" alt="thumbnail"/>
                    <div className="inventory_info">
                        <select>
                            <option value="" disabled selected>카테고리</option>
                            <option value="">화장품</option>
                            <option value="">식품</option>
                            <option value="">생필품</option>
                            <option value="">기타</option>
                        </select>
                        <div>
                            <span className="title">상품명</span>
                            <span className="option">옵션명</span>
                        </div>
                    </div>
                </div>
                <div className="state_box">
                    <span>안전재고</span>
                    <div>
                        <input type="number"/>
                    </div>
                </div>
                <div className="state_box">
                    <span>재고 현황</span>
                    <div className="counter">
                        <span className="material-symbols-rounded">remove</span>
                        <input type="number" className="counter_value" value={1}/>
                        <span className="material-symbols-rounded">add</span>
                    </div>
                </div>
                <div className="state_box">
                    <span>최근 구매일</span>
                    <div>dayPicker</div>
                </div>
                <div className="state_box">
                    <span>메모</span>
                    <textarea rows={5} spellCheck={false}></textarea>
                </div>
            </div>
            <div className="component_btn">
                <button className="btn_y">수정</button>
                <button className="btn_r">삭제</button>
            </div>
        </div>
    )
}