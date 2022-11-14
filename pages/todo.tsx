import { useState, useEffect } from 'react';
import { db } from '../hooks/firebase';
import { collection, getDocs ,query, where} from 'firebase/firestore';

type User = {
    Day:string;
    isCompeted:boolean;
    taskText:string;
    who:string;
}

function App() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const usersCollectionRef = query(collection(db,"tasks"),where("who","==",user && user.email))
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
  
    return(
        <div className='text-center' >
            {users.map((user, index) => (
                <div key={index.toString()}>{user.who}</div>
            ))}

            {users.map((user, index) => (
                <div key={index.toString()}>{user.taskText}</div>
            ))}

            {users.map((user, index) => (
                <div key={index.toString()}>{user.Day}</div>
            ))}
        </div>
    );
}

export default App;