import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase";
import Twit from "./twit";

export interface ITwit {
    createAt: number,
    imageUrl: string,
    twit: string,
    userId: string,
    userName: string,
    id: string,
}

export default function TImelime() {
    const [twits, setTwits] = useState<ITwit[]>([]);

    const getTwits = async () => {
        const twitsQuery = query(collection(db, "twits"), orderBy("createAt", "desc"));
        const snapshot = await getDocs(twitsQuery);
        console.log(snapshot.docs);

        const snaptwits = snapshot.docs.map((doc) => {
            console.log(doc.data());

            const { createAt, imageUrl, twit, userId, userName } = doc.data();
            return { createAt, imageUrl, twit, userId, userName, id: doc.id };
        })
        setTwits(snaptwits);
    }

    useEffect(() => {
        getTwits();
    }, [])


    return (
        <div>
            {twits.map((twit) => (
                <Twit key={twit.id} {...twit} />
            ))}
        </div>
    )
}