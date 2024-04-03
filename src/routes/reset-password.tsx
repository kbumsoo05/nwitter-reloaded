import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Input, Logo, SubmitInput, Wrapper, Form, Switcher, Send } from "../components/auth-components";

export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [inform, setInform] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        if (name == "email") {
            setEmail(value)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            if (loading == true || email == "") {
                setError("빈칸을 채워주세요");
                return;
            }
            await sendPasswordResetEmail(auth, email);
            setInform(true);
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.log(e.message);
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }

    }

    return (
        <Wrapper>
            <Logo>𝕏𝕏𝕏</Logo>
            <Form onSubmit={onSubmit}>
                <Input
                    onChange={onChange}
                    value={email}
                    name="email"
                    placeholder="email"
                />
                <SubmitInput
                    type="submit"
                    value={loading ? "loading" : "confirm"}
                />
                {error == "" ?
                    inform ?
                        <Send>check out email!</Send>
                        :
                        null
                    :
                    <Error>{error}</Error>
                }
                <Switcher>don't have account? <Link to={"/create-account"}>create account&rarr;</Link></Switcher>
                <Switcher><Link to={"/login"}>login &rarr;</Link></Switcher>
            </Form>
        </Wrapper>
    )
}