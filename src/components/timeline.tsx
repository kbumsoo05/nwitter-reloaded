import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase";
import { Unsubscribe } from "firebase/auth";
import styled from "styled-components";
import Tweet from "./twit";

export interface ITwit {
    createAt: number,
    imageUrl: string,
    twit: string,
    userId: string,
    userName: string,
    id: string,
}

const Wrapper = styled.div`
display: flex;
flex-direction: column;
overflow-y: scroll;
height: 100vh;
`;

export default function TImelime() {
    const [twits, setTwits] = useState<ITwit[]>([]);



    useEffect(() => {
        let unsubscribe: Unsubscribe | null = null;
        const getTwits = async () => {
            const twitsQuery = query(collection(db, "twits"), orderBy("createAt", "desc"));

            // const snapshot = await getDocs(twitsQuery);
            // const snaptwits = snapshot.docs.map((doc) => {
            //     const { createAt, imageUrl, twit, userId, userName } = doc.data();
            //     return { createAt, imageUrl, twit, userId, userName, id: doc.id };
            // })

            unsubscribe = onSnapshot(twitsQuery, (snapshot) => {
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
            })
        }
        getTwits();
        return () => {
            unsubscribe && unsubscribe();
        }
    }, [])


    return (
        <Wrapper>
            {twits.map((twit) =>
                <Tweet key={twit.id} {...twit} />
            )}
        </Wrapper>
    )
}