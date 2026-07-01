import InventoryList from "./component/InventoryList.tsx";
import Header from "./component/Header.tsx";
import InventoryDetail from "./component/InventoryDetail.tsx";
import InventoryRegister from "./component/InventoryRegister.tsx";
import Join from "./component/Join.tsx";
import {useEffect, useState} from "react";
import {supabase} from "./lib/supabase.ts";
import type {Session} from "@supabase/supabase-js";
import 'react-day-picker/dist/style.css';
import {ToastContainer} from "react-toastify";
import type {InventoryType} from "./types/InventoryType.ts";

function App() {
    /* 재고 관리 페이지
      ** 제품이 하나도 없으면 등록만 보이기. 제품이 하나라도 있으면 목록만 보이기. 제품 상세가 있으면 등록 안보이기.
    * 목록의 기능 - 제품 이름, 썸네일, 옵션, 현재 갯수, 안전재고 도달 유무, 필터 필요할거같음(재고순, 수정순, 등록순)
    * 상세의 기능 - 썸네일, 카테고리, 이름, 옵션, 현재 갯수, 안전재고, 최근 구매일, 메모들의 view, modify
    * 등록의 기능 - 이름, 옵션 (일치하는 거 있으면 찾아줘야함), 썸네일, 카테고리, 현재 갯수, 안전재고, 최근 구매일, 메모들의 저장

      보안 측면에서, 실력 측면에서 로그인도 도입하기로 결정. = 회원가입 필요. id랑 password. 가입일, 인벤토리 갯수,
    *
    * 달력 react dayPicker 사용하기
    *
    * 스타일
    * 세 컴포넌트 모두 바깥 스타일 동일,
    * 목록의 썸네일 스타일(재고, 안전재고) - 그리드로 클릭 전엔 4개씩 한 줄, 클릭해서 상세 나오면 2개씩 한 줄,
    * 상세 form, 등록 form

    추후 업뎃 후보
    1. 재고 엑셀 출력
    2. 검색...?
    * */

    const [session, setSession] = useState<Session | null>(null);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const refreshInventory = async ()=>{
        setIsLoading(true);
        await getInventory();
    }
    const [inventoryList, setInventoryList] = useState<InventoryType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getInventory(){
        try {
            const { data, error } = await supabase.from("inventory").select("*");

            if(error){
                console.error(error);
                setIsLoading(false);
                return;
            }
            setInventoryList(data ?? []);
        } catch (err){
            console.error(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(()=>{
        // 세션 정보 get
        supabase.auth.getSession().then(({data})=>{
            setSession(data.session);
        })

        // 변경 감지
        const {data: {subscription}} = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        )

        return ()=> subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if(session){
            getInventory();
        }
    }, [session]);

    return (
        <div>
            <Header user={session?.user}/>
            {!session && <Join/>}
            {
                session &&
                <div className="container">
                    <InventoryList
                        onAdd={()=> {
                            console.log('add');
                            setIsOpenForm(true);
                        }}
                        onDetail={()=> setIsOpenDetail(true)}
                        inventoryList={inventoryList} isLoading={isLoading}
                    />

                    {isOpenForm && <InventoryRegister onClose={()=>setIsOpenForm(false)} onSuccess={refreshInventory}/>}

                    {isOpenDetail && <InventoryDetail onClose={()=>setIsOpenDetail(false)}/>}
                </div>
            }
            <ToastContainer position="top-center" theme="colored" />
        </div>
    )
}

export default App
