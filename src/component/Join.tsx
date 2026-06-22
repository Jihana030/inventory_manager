
export default function Join () {
    return (
        <div className="user_join">
            <div>
                <div className="join_input_box">
                    <div className="input_box">
                        <input type="text" id="join_id" placeholder=""/>
                        <label htmlFor="join_id">아이디</label>
                    </div>
                    <div className="input_box">
                        <input type="password" id="join_pw" placeholder=""/>
                        <label htmlFor="join_pw">비밀번호</label>
                    </div>
                </div>
                <div className="join_btn_box">
                    <button>회원가입</button>
                    <button className="btn_p">로그인</button>
                </div>
            </div>
        </div>
    )
}