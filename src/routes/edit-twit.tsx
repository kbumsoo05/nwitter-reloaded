import React, { useEffect, useState } from "react";
import styled from "styled-components"
import { auth, db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useLocation, useNavigate } from "react-router-dom";

interface TwitData {
    twit: string;
}

const Wrapper = styled.div`
    width: 80%; /* 폼의 너비를 조정 */
    max-width: 600px; /* 최대 너비 설정 */
    margin: 20px auto; /* 페이지 중앙에 폼을 위치시킴 */
    padding: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px; /* 요소들 사이의 간격 */
`;

const Textarea = styled.textarea`
    height: 150px; /* 텍스트 영역의 높이 */
    padding: 10px; /* 내부 여백 */
    font-size: 16px; /* 폰트 크기 */
    border: 1px solid #ccc; /* 테두리 스타일 */
    border-radius: 5px; /* 테두리 둥글게 */
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const AddImageLabel = styled.label`
    display: inline-block;
    padding: 10px 20px;
    background-color: #AAF0D1;
    color: #333333;
    text-align: center;
    border: solid 1px #cfc1c1;
    border-radius: 5px;
    cursor: pointer; /* 마우스를 버튼 위에 올렸을 때 손가락 모양으로 변경 */
    font-weight: bold;
    /* 호버 효과 */
    &:hover {
        background-color: #80C9AC;
    }
`;

const AddImageInput = styled.input`
    display: none; /* 파일 입력을 숨김 */
`;

const Submit = styled.input`
    padding: 10px 20px;
    background-color: #AAF0D1;
    color: #333333;
    border: none;
    border-radius: 10px;
    border: solid 1px #cfc1c1;
    cursor: pointer;
    font-weight: bold;
    /* 호버 효과 */
    &:hover {
        background-color: #80C9AC;
    }
`;


export default function EditTwit() {
    const [loading, setLoading] = useState(false);
    const [twit, setTwit] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const location = useLocation();
    const nagvigate = useNavigate();

    useEffect(() => {
        fillDoc();
    }, [])

    const onTexeareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTwit(e.target.value);
    }
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files?.length === 1) {
            setFile(files[0])
        }
    }

    const fillDoc = async () => {
        const twitdoc = await getDoc(doc(db, "twits", location.state));

        if (twitdoc.exists()) {
            const twitData = twitdoc.data() as TwitData;
            setTwit(twitData.twit);
        } else {
            console.log("수정할 문서 못찾음");
        }
    }



    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = auth.currentUser;
        console.log(user?.uid, file, twit);
        if (user == null || twit == "" || twit.length > 180 || loading) return;

        try {
            setLoading(true);
            const docRef = doc(db, "twits", location.state);

            updateDoc(docRef, {
                twit: twit,
            })

            if (file !== null) {
                const imageRef = ref(storage, `twits/${user.uid}-${user.displayName}/${docRef.id}`);
                const uploadResult = await uploadBytes(imageRef, file);
                const imageUrl = await getDownloadURL(uploadResult.ref);

                await updateDoc(docRef, {
                    imageUrl: imageUrl,
                });

                console.log("Image URL:", imageUrl);
            }
        } catch (e) {
            console.error("Error uploading the twit:", e);
        } finally {
            setLoading(false);
            nagvigate("/");
        }
    }

    return (
        <Wrapper>
            <Form onSubmit={onSubmit}>
                <Textarea value={twit} onChange={onTexeareaChange} placeholder="whats happening" />
                <AddImageLabel htmlFor="imgUpload">{file === null ? "add img" : "file added"}</AddImageLabel>
                <AddImageInput onChange={onFileChange} id="imgUpload" type="file" accept="image/*" />
                <Submit type="submit" value={loading ? "loading..." : "upload"} />
            </Form>
        </Wrapper>
    )
}