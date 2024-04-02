import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"

export default function Home() {

    const navigate = useNavigate();
    const onclick = () => {
        auth.signOut();
        navigate("/login");
    }

    return (
        <div>
            <h1>home</h1>
            <button onClick={onclick}>logout</button>
        </div>
    )
}