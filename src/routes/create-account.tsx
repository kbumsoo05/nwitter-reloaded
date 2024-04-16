import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Input, Logo, SubmitInput, Wrapper, Form, Switcher } from "../components/auth-components";


export default function CreateAccount() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        if (name == "name") {
            setName(value)
        } else if (name == "email") {
            setEmail(value)
        } else if (name == "password") {
            setPassword(value)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name, email, password);
        try {
            setError("");
            setLoading(true);
            if (loading == true || name == "" || email == "" || password == "") return;
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            await updateProfile(credentials.user, { displayName: name });
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
                    value={name}
                    name="name"
                    placeholder="name"
                />
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
                    value={loading ? "loading" : "create account"}
                />
                {error == "" ? null : <Error>{error}</Error>}
                <Switcher>have account? <Link to={"/login"}>login &rarr;</Link></Switcher>
                <Switcher><Link to={"/reset-password"}>reset password&rarr;</Link></Switcher>
            </Form>
        </Wrapper>
    )
}