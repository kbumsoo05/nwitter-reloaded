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
padding: 20px;
  height: 100vh; 
  width: ${menuWidth}vw; 
  display: flex;
  flex-direction: column; 
  justify-content: flex-start; 
  align-items: flex-start; 
  gap: 10px;
  background-color: white; 
  border-right: 1px solid #ccc; 
  box-sizing: border-box; 
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const MenuLine = styled.div`
display: flex;  
gap: 10px;
justify-content: center;
align-items: center;   

`;

const StyledLink = styled(Link)`
    display: flex;
    text-decoration: none; // 밑줄 제거
    font-size: 17px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #294f6a;
    border-radius: 8px;
    padding: 2px;
    width: 90%;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const MenuSpan = styled.span`
`;

const MenuItem = styled.div`
    width: 36px;
    height: 36px;
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
                <StyledLink to={"/"}>

                    <MenuLine>
                        <MenuItem>
                            <svg data-slot="icon" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M8.543 2.232a.75.75 0 0 0-1.085 0l-5.25 5.5A.75.75 0 0 0 2.75 9H4v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h1.25a.75.75 0 0 0 .543-1.268l-5.25-5.5Z" />
                            </svg>
                        </MenuItem>
                        <MenuSpan>home</MenuSpan>
                    </MenuLine>
                </StyledLink>
                <StyledLink to={"/profile"}>
                    <MenuLine>
                        <MenuItem>
                            <svg data-slot="icon" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clipRule="evenodd" fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z" />
                            </svg>
                        </MenuItem>
                        <MenuSpan>profile</MenuSpan>
                    </MenuLine>
                </StyledLink>
                <MenuItem onClick={onLogout}>
                    <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"></path>
                    </svg>
                </MenuItem>
            </Menu>
            <OutletWrapper>

                <Outlet />
            </OutletWrapper>

        </Wrapper>
    )
}