import {supabase} from "../lib/supabase.ts";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {showErrToast, showToast} from "../lib/toast.ts";

export default function Join () {
    const [authError, setAuthError] = useState<string>("");
    // rhf
    type Inputs = {
        email : string;
        password : string;
    }
    const {register, handleSubmit, formState: { errors }} = useForm<Inputs>();
    // 회원가입
    const onSignUp = async (data: Inputs)=>{
        setAuthError("");
        try {
            const {error} = await supabase.auth.signUp({
                email : data.email,
                password : data.password,
            })

            //이미 가입한 회원
            if(error){
                setAuthError(error.message);
                return;
            }

            showToast("회원가입에 성공했습니다!")

            console.log(data);
        } catch (err) {
            console.error(err)
            showErrToast("회원가입에 실패했습니다 ㅜㅜ")
        }

    }

    return (
        <div className="user_join">
            <form onSubmit={handleSubmit(onSignUp)}>
                <div className="join_input_box">
                    <div className="input_box">
                        <input type="text" id="join_id" placeholder="" defaultValue={""} {...register("email", {required: "이메일 주소를 입력해주세요.", pattern:{value:/^[a-zA-Z0-9+-|_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "올바른 이메일 형식을 작성해주세요."}})}/>
                        <label htmlFor="join_id">이메일</label>
                        {errors.email && (
                            <p className="err_msg">{errors.email.message}</p>
                        )}
                        {authError && (
                            <p className="err_msg">{authError}</p>
                        )}
                    </div>
                    <div className="input_box">
                        <input type="password" id="join_pw" placeholder="" defaultValue={""} {...register("password", {required: "비밀번호를 입력해주세요.", minLength:{value:6, message:"비밀번호는 최소 6자 입니다."}})}/>
                        <label htmlFor="join_pw">비밀번호</label>
                        {errors.password && (
                            <p className="err_msg">{errors.password.message}</p>
                        )}
                    </div>
                </div>
                <div className="join_btn_box">
                    <button>회원가입</button>
                    {/*<button type="submit" className="btn_p">로그인</button>*/}
                </div>
            </form>
            <ToastContainer position="top-center" theme="colored" />
        </div>
    )
}