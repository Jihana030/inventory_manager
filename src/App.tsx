import InventoryList from "./component/InventoryList.tsx";
import Header from "./component/Header.tsx";
import SideMenu from "./component/SideMenu.tsx";
import InventoryDetail from "./component/InventoryDetail.tsx";
import InventoryRegister from "./component/InventoryRegister.tsx";

function App() {

    /* 재고 관리 페이지
      0. 날짜 나오는 헤더
    * 1. 단일 페이지인데 재고 목록, 제품 상세(수정가능) , 제품 등록 있어야함.
    * 2. 큰 컴포넌트가 3개.
    *
    * 목록의 기능 - 제품 이름, 썸네일, 옵션, 현재 갯수, 안전재고 도달 유무, 필터 필요할거같음(재고순, 수정순, 등록순)
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
            <Header/>
            <div className="container">
                <InventoryList/>
                <SideMenu/>
                <InventoryDetail/>
                <InventoryRegister/>
            </div>
        </div>
    )
}

export default App
