import { styled } from "styled-components";
import { ITwit } from "./timeline";
import { useState } from "react";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  background-color: white; 
  border: 3px solid #d3d3d3; 
  width: 70%; 
  margin: auto; 
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 40px;
`;

const EditDele = styled.div`
  height: 27px;
  width:  27px;
`;

const Column = styled.div`
  display: flex; 
  width: 100%;
  flex-direction: column; 
  align-items: center; 
  gap: 20px; 
  margin: 20px 0px;
`;

const GoLeft = styled.div`
  width: 95%;
`

const Photo = styled.img`
  width: 280px; 
  height: 250px; 
  object-fit: cover;
  border-radius: 8px; 
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
`;

const ComentLike = styled.div`
  width: 100%;
  height: 75px;
  border-top: 3px solid gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Coment = styled.div`
  display: flex;
  padding-left: 14px;
`;

const Like = styled.div`
  display: flex;
  padding-right: 15px;
  gap: 5px;
  align-items: center;
`;

const UserProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;
const Username = styled.span`
  font-weight : bold ;
  color: #333; 
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NameComent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`;

const UserName = styled.span``;

const UserComent = styled.p``;

const Payload = styled.p`
  color: #666; 
`;

const LikedNum = styled.span``;

const LikeLogo = styled.div`
height: 35px;
width: 35px;
transition: transform 0.2s ease-in-out, background-color 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;

export default function Tweet({ userName, imageUrl, twit, userId, id }: ITwit) {
  const [liked, setLiked] = useState(false);
  const user = auth.currentUser;
  //await getDownloadURL(ref(storage,"profille-image/base-profile-img"));
  const onLikeClick = () => {
    setLiked((prev) => !prev)
  }

  const onDelete = async () => {
    const a = confirm("게시물 지우시겟습까?");
    if (a) {
      try {

        await deleteDoc(doc(db, "twits", id))
        if (imageUrl) {
          const imageRef = ref(storage, `twits/${userId}-${user?.displayName}/${id}`)
          await deleteObject(imageRef);
        }
      } catch (e) {
        console.log(e);

      } finally {

      }
    }


  }

  return (
    <Wrapper>
      <Column>
        <GoLeft>
          <Username>
            <UserProfile src="/base-profile-img.jpg" />
            {userName}
            {user?.uid == userId ?
              <EditDele>
                <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </EditDele>
              : null}
            {user?.uid == userId ?
              <EditDele onClick={onDelete}>
                <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </EditDele>
              : null}
          </Username>

        </GoLeft>
        {imageUrl ? (
          <Photo src={imageUrl} />
        ) : null}
        <GoLeft>
          <Payload>{twit}</Payload>
        </GoLeft>
      </Column>
      <ComentLike>
        <Coment>
          <UserProfile src="/base-profile-img.jpg" alt="example" />
          <NameComent>
            <UserName>{userName}</UserName>
            <UserComent>coment 미완성  </UserComent>
          </NameComent>
        </Coment>
        <Like>
          <LikedNum>12미완성</LikedNum>
          {liked ?
            <LikeLogo onClick={onLikeClick}>
              <svg data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </LikeLogo>
            :
            <LikeLogo onClick={onLikeClick}>
              <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </LikeLogo>
          }
        </Like>
      </ComentLike>
    </Wrapper>
  );
}