import { useNavigate } from "react-router-dom"
import TImelime from "../components/timeline";
import styled from "styled-components";

const UploadBtn = styled.button`
  position: fixed; /* 버튼을 페이지에 고정 */
  right: 30px; /* 오른쪽 아래에 위치 */
  bottom: 30px;
  width: 60px; /* 버튼의 크기 */
  height: 60px;
  border-radius: 50%; /* 동그란 모양 */
  background-color: #c5c5eb; /* 배경색은 초록색 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  color: white; /* 텍스트 색상은 흰색 */
  font-size: 16px; /* 텍스트 크기 */
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
  border: none; /* 테두리 제거 */
  display: flex; /* 텍스트 가운데 정렬을 위한 flex 설정 */
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  transition: transform 0.2s ease-in-out, background-color 0.2s; /* 변환 및 배경색 변경에 대한 전환 효과 추가 */
  &:hover {
    background-color: #9981ce; /* 호버 시 배경색 변경 */
    transform: scale(1.1); /* 호버 시 크기 증가 */
  }
`;

export default function Home() {
    const navigate = useNavigate();

    const onClickUpload = () => {
        navigate('/upload');
    }

    return (
        <div>
            <UploadBtn onClick={onClickUpload}>
                <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </UploadBtn>

            <TImelime />
        </div>
    )
}