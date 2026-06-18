export default function InventoryRegister() {


    return (
        <div className="inventory_register">
            <div className="component_title">제품 등록</div>
            <div className="component_body">
                <div className="state_box">
                    <span>이름</span>
                    <input type="text" spellCheck={false}/>
                </div>
                <div className="state_box">
                    <span>옵션</span>
                    <input type="text" spellCheck={false}/>
                </div>
                <div className="inventory_state">
                    <img src="https://images.pexels.com/photos/8166452/pexels-photo-8166452.jpeg" alt=""/>
                    <div>
                        <select>
                            <option value="" disabled selected>카테고리</option>
                            <option value="">화장품</option>
                            <option value="">식품</option>
                            <option value="">생필품</option>
                            <option value="">기타</option>
                        </select>
                        <div className="state_box">
                            <span>재고 현황</span>
                            <div className="counter">
                                <span className="material-symbols-rounded">remove</span>
                                <input type="number" className="counter_value" value={1}/>
                                <span className="material-symbols-rounded">add</span>
                            </div>
                        </div>
                        <div className="state_box">
                            <span>안전재고</span>
                            <div>
                                <input type="number"/>
                            </div>
                        </div>
                        <div className="current_date">
                            <span>최근 구매일</span>
                            <div>dayPicker</div>
                        </div>
                    </div>
                </div>
                <div className="state_box">
                    <span>메모</span>
                    <textarea rows={5}></textarea>
                </div>
            </div>
            <div className="component_btn">
                <button className="btn_y">저장</button>
            </div>
        </div>
    )
}