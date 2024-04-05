import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const menuWidth = 18;

const Wrapper = styled.div`

  height: 100vh; /* 높이 설정 */
  width: 100vw; /* 너비 설정 */
  display: flex; /* Flexbox 사용 */
  justify-content: flex-start; /* 가로 방향으로 오른쪽 정렬 */
  align-items: flex-start; /* 세로 방향으로 중앙 정렬 */
`;

const Menu = styled.div`

position: fixed;
  height: 100vh; /* 높이 설정 */
  width: ${menuWidth}vw; /* 가로 설정 */
  display: flex; /* Flexbox 사용 */
  flex-direction: column; /* 요소들을 세로로 나열 */
  justify-content: flex-start; /* 시작 지점부터 요소를 정렬 */
  align-items: center; /* 가로 방향으로 중앙 정렬 */
  background-color: white; /* 배경색 설정 */
  border-right: 1px solid #ccc; /* 오른쪽 테두리 설정 */
  box-sizing: border-box; /* border 포함하여 width, height 계산 */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const MenuGhost = styled.div`

height: 100vh; /* 높이 설정 */
  width: ${menuWidth}vw; /* 가로 설정 */
`;

const MenuItem = styled.div`
    width: 40px;
    height: 40px;
`;

const OutletWrapper = styled.div`
    width: ${100 - menuWidth}vw;
`

export default function Layout() {
    const onLogout = async () => {
        const a = confirm("로그아웃 할꺼냐는 내용");
        if (a) {
            await auth.signOut();
        }
    }

    return (
        <Wrapper>
            <Menu>
                <Link to={"/"}>
                    <MenuItem>
                        <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
                        </svg>
                    </MenuItem>
                </Link>
                <Link to={"/profile"}>
                    <MenuItem>
                        <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </MenuItem>
                </Link>
                <MenuItem onClick={onLogout}>
                    <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"></path>
                    </svg>
                </MenuItem>
            </Menu>
            <MenuGhost></MenuGhost>
            <OutletWrapper>

                <Outlet />
            </OutletWrapper>

        </Wrapper>
    )
}