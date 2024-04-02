import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Input, Logo, SubmitInput, Wrapper, Form, Switcher } from "../components/auth-components";

export default function CreateAccount() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        if (name == "email") {
            setEmail(value)
        } else if (name == "password") {
            setPassword(value)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            if (loading == true || email == "" || password == "") return;
            const credentials = await signInWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            navigate("/");
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
                <Input
                    onChange={onChange}
                    value={password}
                    name="password"
                    placeholder="password"
                    type="password"
                />
                <SubmitInput
                    type="submit"
                    value={loading ? "loading" : "login"}
                />
                {error == "" ? null : <Error>{error}</Error>}
                <Switcher>don't have account? <Link to={"/createacount"}>create account&rarr;</Link></Switcher>
            </Form>
        </Wrapper>
    )
}