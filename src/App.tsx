
function App() {

    /* 재고 관리 페이지
      0. 날짜 나오는 헤더
    * 1. 단일 페이지인데 재고 목록, 제품 상세(수정가능) , 제품 등록 있어야함.
    * 2. 큰 컴포넌트가 3개.
    *
    * 목록의 기능 - 제품 이름, 썸네일, 옵션, 현재 갯수, 안전재고 도달 유무
    * 상세의 기능 - 썸네일, 카테고리, 이름, 옵션, 현재 갯수, 안전재고, 최근 구매일, 메모들의 view, modify
    * 등록의 기능 - 이름, 옵션 (일치하는 거 있으면 찾아줘야함), 썸네일, 카테고리, 현재 갯수, 안전재고, 최근 구매일, 메모들의 저장
    *
    * 달력 react dayPicker 사용하기
    *
    * 스타일
    * 세 컴포넌트 모두 바깥 스타일 동일,
    * 목록의 썸네일 스타일(재고, 안전재고) - 그리드로 클릭 전엔 4개씩 한 줄, 클릭해서 상세 나오면 2개씩 한 줄,
    * 상세 form, 등록 form
    * */
    return (
        <div>
            <header>2026.06.17 (수) 13:49</header>
            <div className="container">
                <div className="inventory_list">
                    <div className="component_title">재고 목록</div>
                    <div className="component_body">
                        <div className="inventory">
                            <div className="inventory_state">3개</div>
                            <div className="inventory_thumbnail">
                                <img src="https://images.pexels.com/photos/8166452/pexels-photo-8166452.jpeg" alt="thumbnail"/>
                                <p className="inventory_info">
                                    <span className="title">제품 이름</span>
                                    <span className="option">제품 옵션</span>
                                </p>
                            </div>
                        </div>
                        <div className="inventory">
                            <div className="inventory_state immer">
                                <span className="material-symbols-rounded">error</span>
                                재고 주의
                            </div>
                            <div className="inventory_thumbnail">
                                <img src="https://images.pexels.com/photos/8166452/pexels-photo-8166452.jpeg" alt="thumbnail"/>
                                <p className="inventory_info">
                                    <span className="title">제품 이름</span>
                                    <span className="option">제품 옵션</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inventory_detail">
                    <div className="component_title">제품 상세</div>
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
                        <div className="inventory_state">
                            <div className="state_box">
                                <span>재고 현황</span>
                                <div className="counter">
                                    <span>-</span>
                                    <input type="number" className="counter_value"/>
                                    <span>+</span>
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
                            <div className="state_box">
                                <span>메모</span>
                                <textarea rows={5}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="component_btn">
                        <button className="btn_y">수정</button>
                        <button className="btn_r">삭제</button>
                    </div>
                </div>
                <div className="inventory_register">
                    <div className="component_title">제품 등록</div>
                    <div className="component_body">
                        <div className="state_box">
                            <span>이름</span>
                            <input type="text"/>
                        </div>
                        <div className="state_box">
                            <span>옵션</span>
                            <input type="text"/>
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
                                        <span>-</span>
                                        <input type="number" className="counter_value"/>
                                        <span>+</span>
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

            </div>
        </div>
    )
}

export default App
