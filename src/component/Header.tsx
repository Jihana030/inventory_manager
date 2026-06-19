import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 윤년 판단 플러그인
import 'dayjs/locale/ko'; // 한국어 가져오기

export default function Header(){
    dayjs.extend(isLeapYear); // 플러그인 등록
    dayjs.locale('ko'); // 언어 등록

    const nowDate = dayjs(new Date()).format('YYYY년 MM월 DD일 (dd) HH:MM');

    return (
        <header>
            <div>
                <span>userId의 재고 서랍</span>
                <span>{nowDate}</span>
            </div>
        </header>
    )
}