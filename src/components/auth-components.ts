import styled from "styled-components";

export const Switcher = styled.span`
  font-size: 12px;
`;

export const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 350px;
    width: 250px;
    gap: 15px;
    border: 2px solid #ccc;
    border-radius: 20px;

`;

export const Input = styled.input`
  width: 200px; /* 너비 설정 */
  height: 30px; /* 높이 설정 */
  border-radius: 15px; /* 모서리 둥글게 설정 */
  padding: 10px; /* 내부 여백 설정 */
  font-size: 13px; /* 폰트 크기 설정 */
  border: 1px solid #ccc; /* 테두리 설정 */
  box-sizing: border-box; /* padding과 border가 width와 height에 포함되도록 설정 */
  &:hover {
    background-color: #f0f0f0; /* 마우스 오버 시 배경색 */
  }

  &:focus {
    background-color: #e0e0e0; /* 포커스 시 배경색 */
    outline: none; /* 기본 브라우저 포커스 테두리 제거 */
  }
  
`;

export const SubmitInput = styled.input`
    width: 170px; /* 너비 설정 */
    height: 25px; /* 높이 설정 */
    border-radius: 15px; /* 모서리 둥글게 설정 */
    font-size: 13px; /* 폰트 크기 설정 */
    border: 1px solid #ccc; /* 테두리 설정 */
    box-sizing: border-box; /* padding과 border가 width와 height에 포함되도록 설정 */
    background-color: #DBF0FF;
    &:hover {
        background-color: #B0D0EF; /* 마우스 오버 시 배경색 */
    }
`;

export const Logo = styled.span`
    font-size: 100px;
    font-weight: 900;
`

export const Error = styled.span`
    font-size: 12px;
    color: tomato;
`;

export const Send = styled.span`
    font-size: 14px;
`;

