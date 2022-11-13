import { useRouter } from "next/router"
import { useState, useEffect } from 'react';
import { db,app } from '../hooks/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged,getAuth } from "firebase/auth"
import { Spacer } from "@nextui-org/react"
import { Heading, Box, Button, Text } from '@chakra-ui/react';

type User = {
    Day:string;
    isCompeted:boolean;
    taskText:string;
    who:string;
}

const Day = () => {
    const router= useRouter();
    const {id} = router.query;
    const auth = getAuth(app)

    const [users, setUsers] = useState<User[]>([]);
    const [user,setUser] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
      }, []);
    

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

    const getTime = () => {
        const date1 = new Date();
        const date2 = date1.getFullYear()  + 
                    ("00" + (date1.getMonth() + 1)).slice(-2)  + 
                    ("00" + (date1.getDate())).slice(-2); 
        console.log(date2);
        return date2;
    }

    return (
        <>
            <div className="text-5xl text-center p-5">
                {id}
            </div>
            {/* <div className="text-5xl text-center p-8"> */}
            <Heading className="text-center">
                TODO LIST
            </Heading>
            {/* </div> */}
            <Spacer y={2} />
            <div className="text-center">
                {user && user.email}がログイン中
            </div>
            <Spacer y={1} />
            <div className='text-center' >
                {users.map((user) => (
                    <div key={user.toString()}>
                        <input type = "checkbox" />
                        <label>{user.taskText}</label>
                    </div>
                ))}
                
            </div>
        </>
    )
}
export default Day;