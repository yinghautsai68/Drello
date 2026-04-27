import { useEffect, useState } from "react";
import { login } from "../services/auth.service";
import toast from "react-hot-toast";
import { loginSchema } from "../schemas/auth.schema";
export type LoginFormType = {
    username: string,
    password: string
}
const Login = () => {

    const [loginForm, setLoginForm] = useState<LoginFormType>({
        username: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setLoginForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('submit');
        e.preventDefault();

        const result = loginSchema.safeParse(loginForm);
        if (!result.success) {
            toast.error(result.error.issues[0].message);
            return;
        }
        try {
            const data = await login(loginForm);
            console.log(data);
            localStorage.setItem('token', data);
            toast.success('登入成功');
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => console.log(loginForm), [loginForm]);
    return (
        <div className=" flex flex-col items-center w-full h-screen bg-black text-gray-200">
            <div className="flex flex-col justify-center items-center w-full flex-1">
                <div className="flex flex-col justify-center items-center w-full max-w-md h-[450px] pt-10 pb-5 md:border rounded-lg">
                    <h1 className="text-center text-3xl">登入</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <label htmlFor="username">用戶名稱</label>
                        <input id="username" name="username" value={loginForm.username} onChange={handleChange} type="text" className="border" />
                        <label htmlFor="password">密碼</label>
                        <input id="password" name="password" value={loginForm.password} onChange={handleChange} type="password" className="border" />
                        <button type="submit" className="bg-emerald-700 rounded-lg">登入</button>
                    </form>
                </div>
            </div>

            <div className=" w-full min-h-[100px] bg-emerald-900">

            </div>
        </div>
    )
}

export default Login