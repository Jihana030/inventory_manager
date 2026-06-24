import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 윤년 판단 플러그인
import 'dayjs/locale/ko';
import type {User} from "@supabase/supabase-js";
import {supabase} from "../lib/supabase.ts";
import {showErrToast} from "../lib/toast.ts"; // 한국어 가져오기

type HeaderProps = {
    user?: User;
}

export default function Header({user}: HeaderProps){
    dayjs.extend(isLeapYear); // 플러그인 등록
    dayjs.locale('ko'); // 언어 등록

    const nowDate = dayjs(new Date()).format('YYYY년 MM월 DD일 (dd) HH:mm');

    const splitEmail = user?.email?.split("@") || "";

    // 로그아웃
    async function signOut(){
        const {error} = await supabase.auth.signOut();
        if(error){
            showErrToast("로그아웃에 실패했습니다. 다시 시도해주세요.")
        }
    }

    return (
        <header>
            <div>
                <span>{nowDate}</span>
                <div className="user_state">
                    <span>{user ? `${splitEmail[0]}님의 재고 서랍` : '로그인/회원가입을 통해 재고를 관리해보세요.'}</span>
                    {user && <span className="material-symbols-rounded" onClick={signOut}>logout</span>}
                </div>
            </div>
        </header>
    )
}