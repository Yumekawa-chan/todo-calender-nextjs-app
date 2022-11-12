import { useRouter } from "next/router"
import { useState, useEffect } from 'react';
import { db } from '../hooks/firebase';
import { collection, getDocs } from 'firebase/firestore';

type User = {
    Day:string;
    isCompeted:boolean;
    taskText:string;
    who:string;
}

const Day = () => {
    const router= useRouter();
    const {id} = router.query;

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const usersCollectionRef = collection(db, 'tasks');
        getDocs(usersCollectionRef).then((querySnapshot) => {
            const  userList: User[] = [];
            let count: number = 0;
            querySnapshot.docs.map((doc, index) => {
            if (count === index ) {
            const user: User= {
            taskText: doc.data().taskText,
            isCompeted: doc.data().isCompeted,
            who: doc.data().who,
            Day: doc.data().Day,
                };
                    userList.push(user);
                    count += 1;
                };
            });
            setUsers(userList);
        });
    }, []);

    return (
        <>
        <div className="text-5xl text-center p-5">
            {id}
        </div>
        <div className="text-5xl text-center p-8">
            TODO LIST
        </div>
        <div className='text-center' >
            {users.map((user, index) => (
                <div key={index.toString()}>{user.taskText}</div>
            ))}

        </div>
        </>
    )
}
export default Day;