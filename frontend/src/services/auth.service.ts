import type { LoginFormType } from "../pages/Login";

export const login = async (form: LoginFormType) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
        const result = await response.json();
        if (!result.success) {
            console.error(result.message);
            throw new Error;
        }

        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}