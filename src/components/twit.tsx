import { styled } from "styled-components";
import { ITwit } from "./timeline";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import PopupTwit from "./popupTwit";

const Wrapper = styled.div`
width: 30vw;
  margin: auto; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 40px;
  border-bottom: 1px solid #ccc;
`;

const EditDele = styled.div`
  height: 27px;
  width:  27px;
  color: #2a526f;
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
  width: 100%;
`

const Photo = styled.img`
  width: 30vw; 
  object-fit: cover;
  border-radius: 3px; 
  border: 1px solid #ccc;
`;

const ComentLike = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const Payload = styled.p`
  color: #666; 
  font-size: 15px;
  font-weight: 700;
`;

const LikedNum = styled.span``;

export const LikeLogo = styled.div`
height: 30px;
width: 30px;
transition: transform 0.2s ease-in-out, background-color 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;

export default function Tweet({ createAt, userName, imageUrl, twit, userId, id }: ITwit) {
  const [liked, setLiked] = useState(false);
  const [likeMembers, setLikeMembers] = useState([""]);
  const [likeNum, setLikeNum] = useState(0);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const docRef = doc(db, "twits", id);

  //await getDownloadURL(ref(storage,"profille-image/base-profile-img"));

  useEffect(() => {
    getLikeMembers();
  }, []);

  const getLikeMembers = async () => {

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setLikeMembers(docSnap.data()?.likeMembers);
      setLikeNum(docSnap.data()?.likeMembers.length);
      if (docSnap.data()?.likeMembers.includes(user?.uid)) {
        setLiked(true);
      }
    }
  };

  const onLikeClick = async () => {
    setLiked((prev) => !prev)
    if (liked) {

      setLikeNum((prev) => prev - 1);
      if (user?.uid) {
        likeMembers.splice(likeMembers.indexOf(user?.uid), 1);
      }

    } else {

      setLikeNum((prev) => prev + 1);
      if (user?.uid) {
        likeMembers.push(user?.uid);
      }

    }

    await updateDoc(docRef, {
      likeMembers: likeMembers,
    });

  }

  const onEdit = () => {
    navigate('/edittwit', { state: id })
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
              <EditDele onClick={onEdit}>
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
        <PopupTwit createAt={createAt} imageUrl={imageUrl} twit={twit} userId={userId} id={id} userName={userName} />
        <Like>
          <LikedNum>{likeNum}</LikedNum>
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