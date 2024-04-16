import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { ITwit } from "../components/timeline";
import Tweet from "../components/twit";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ProfileHead = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid gray;
    height: 250px;
    width: 80%;
`;

const AvatarImg = styled.img`
    height: 160px;
    width: 160px;
`;

const AvatarLabel = styled.label`
    overflow: hidden;
    padding: 10px;
    height: 140px;
    width: 140px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: gray;
`;

const AvaterInput = styled.input`
    display: none;
`;

const ProfileInfo = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
width: 50%;
height: 150px;
gap: 20px;
justify-content: space-around;
`;

const InfoBtn = styled.button`
    border-radius: 8px;
    border: none;
    background-color: #a9d4f2;
    height: 30px;
    font-size: 13px;
    padding: 0px 10px;

    &:hover{
        background-color: #c0dcf0;
    }
`;

const InfoOne = styled.div`
display: flex;
justify-content: space-between;
`;

const InfoTwo = styled.div``;

const InfoThree = styled.div``;

const SpanOne = styled.span`
font-size: 21px;
font-weight: 500;
`;

const SpanTwo = styled.span`
font-size: 16px;
font-weight: 400;
`;

const SpanThree = styled.span``;

const ProfileBody = styled.div`
    display: flex;
    flex-direction: column;
    overflow: scroll;
    width: 100%;
    height: 60vh;
`;


export default function Profile() {
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL);
    const [twits, setTwits] = useState<ITwit[]>([]);

    useEffect(() => {
        getTwits();
    }, [])

    const getTwits = async () => {
        const twitsQuery = query(
            collection(db, "twits"),
            where("userId", "==", user?.uid),
            orderBy("createAt", "desc"),

        )
        const snapshot = await getDocs(twitsQuery);
        const twits = snapshot.docs.map((doc) => {
            const { createAt, imageUrl, twit, userId, userName } = doc.data();
            return {
                createAt,
                imageUrl,
                twit,
                userId,
                userName,
                id: doc.id
            };
        });
        setTwits(twits);

    }

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files?.length === 1 && user) {
            const imageRef = ref(storage, `avatar/${user?.uid}`);
            const uploadResult = await uploadBytes(imageRef, files[0]);
            const imageUrl = await getDownloadURL(uploadResult.ref);

            await updateProfile(user, { photoURL: imageUrl });
            setAvatar(imageUrl);
        }

    }

    return (
        <Wrapper>
            <ProfileHead>
                <AvatarLabel htmlFor="avatar">
                    {avatar ?
                        <AvatarImg src={avatar} />
                        :
                        <svg data-slot="icon" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                    }
                </AvatarLabel>
                <AvaterInput onChange={onFileChange} id="avatar" type="file" accept="image/*" />
                <ProfileInfo>
                    <InfoOne>
                        <SpanOne>{user?.displayName}</SpanOne>
                        <InfoBtn>프로필 편집</InfoBtn>
                    </InfoOne>
                    <InfoTwo>
                        <SpanTwo>게시물 {twits.length}</SpanTwo>
                    </InfoTwo>
                    <InfoThree>
                        <SpanThree>자기소개</SpanThree>
                    </InfoThree>
                </ProfileInfo>
            </ProfileHead>
            <ProfileBody>
                {twits.map((twit) =>
                    <Tweet key={twit.id} {...twit} />

                )}
            </ProfileBody>
        </Wrapper>
    )
}