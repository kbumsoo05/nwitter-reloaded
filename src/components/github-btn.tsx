import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Button = styled.button`
    display: flex; /* Flexbox 레이아웃 사용 */
    align-items: center; /* 세로 방향 중앙 정렬 */
    justify-content: center; /* 가로 방향 중앙 정렬 */
    gap: 10px;
    background-color: white; /* 바탕색은 하얀색 */
    width: 200px; /* 너비 설정 */
    height: 32px; /* 높이 설정 */
    border-radius: 15px; /* 모서리 둥글게 설정 */
    font-size: 13px; /* 폰트 크기 설정 */
    border: 1px solid #ccc; /* 테두리 설정 */
    box-sizing: border-box; /* padding과 border가 width와 height에 포함되도록 설정 */

  &:hover {
    background-color: #f0f0f0; /* hover일 때 색이 약간 회색으로 */
  }
`;

const Logo = styled.img`
    height: 22px;
`;

export default function GithubBtn() {

    const navigate = useNavigate();
    const onClick = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (e) {
            console.log(e);

        }

    }

    return (
        <Button onClick={onClick}>
            <Logo src={"/git-logo.svg"} />
            github login
        </Button>
    )
}