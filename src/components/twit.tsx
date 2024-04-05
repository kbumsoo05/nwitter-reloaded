import { styled } from "styled-components";
import { ITwit } from "./timeline";

const Wrapper = styled.div`
  background-color: white; /* 바탕색 하얀색 */
  border: 3px solid #d3d3d3; /* 파스텔톤 회색 border */
  width: 70%; /* 부모의 70% 길이 */
  margin: auto; /* 중앙 정렬 */
  border-radius: 8px; /* 모서리를 둥글게 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 약간의 그림자 효과 */
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  transition: transform 0.2s ease-in-out; /* 부드러운 크기 변화 효과를 위해 추가 */
  &:hover {
    transform: scale(1.02); /* 호버 시 5% 증가 */
  }
`;

const Column = styled.div`
  display: flex; /* Flexbox를 사용한 컨테이너 설정 */
  flex-direction: column; /* 자식 요소들을 세로로 정렬 */
  align-items: center; /* 가운데 정렬 */
  gap: 10px; /* 자식 요소들 사이의 간격 */
  padding: 15px; /* 안쪽 여백 */
`;

const Photo = styled.img`
  width: 100px; /* 너비 100px */
  height: 100px; /* 높이 100px */
  object-fit: cover; /* 이미지 비율 유지 */
  border-radius: 8px; /* 이미지 모서리 둥글게 */
`;

const Username = styled.span`
  font-weight: bold; /* 글씨 굵게 */
  color: #333; /* 글씨 색상 */
`;

const Payload = styled.p`
  color: #666; /* 글씨 색상 */
`;


export default function Tweet({ userName, imageUrl, twit }: ITwit) {
  return (
    <Wrapper>
      <Column>
        <Username>{userName}</Username>
        <Payload>{twit}</Payload>
      </Column>
      {imageUrl ? (
        <Column>
          <Photo src={imageUrl} />
        </Column>
      ) : null}
    </Wrapper>
  );
}