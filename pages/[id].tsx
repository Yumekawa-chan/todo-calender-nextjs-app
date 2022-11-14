import { useRouter } from "next/router"
import { useState, useEffect } from 'react';
import { db,app } from '../hooks/firebase';
import { collection, getDocs, setDoc, doc, query, where } from 'firebase/firestore';
import { onAuthStateChanged,getAuth } from "firebase/auth"
import { Spacer } from "@nextui-org/react"
import { Heading} from '@chakra-ui/react';

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
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
      }, []);

    

    useEffect(() => {
        (async()=>{
        const usersCollectionRef = query(collection(db,"tasks"),where("Day","==",getDate()),where("who","==",await(getUserName())))
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
        });})()
    }, []);


    var initFirebaseAuth = () => {
        return new Promise((resolve) => {
        var unsubscribe = auth.onAuthStateChanged((user) => {
            resolve(user);
    
            unsubscribe();
        });
        });
    };

    const getUserName = async () => {
        var userName = await initFirebaseAuth();
        return auth.currentUser?.email;
    }
    

    console.log(typeof getUserName)


    const getTime = () => {
        const date1 = new Date();
        const date2 = date1.getFullYear()  + 
                    ("00" + (date1.getMonth() + 1)).slice(-2)  + 
                    ("00" + (date1.getDate())).slice(-2); 
        console.log(date2);
        return date2;
    }

    const getDate = () => {
        const getDate1 = Object.values({id})[0]?.slice(0,4)
        const getDate2 = Object.values({id})[0]?.slice(5,7)
        const getDate3 = Object.values({id})[0]?.slice(8,10)
        return getDate1 + getDate2 + getDate3
    }

    const getRandomString = () =>{
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 20; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const Add = (e:any) => { // 自動ID定義しなくていい　ドキュメント
        e.preventDefault();
        if (inputText === "") {
            return;
        }

        setDoc(doc(db, "tasks",getRandomString()), {
            Day:getTime(),
            isCompleted: false,
            taskText: inputText,
            who:user && user.email
          });
        setInputText("");
    }

    const handleChange = (e:any) => {
        setInputText(e.target.value);
        console.log(inputText);
      };



    return (
        <>
            <div className="text-5xl text-center p-5">
                {id}
            </div>
            <Heading className="text-center">
                TODO LIST
            </Heading>
            <Spacer y={2} />
            <div className="text-center">
                {user && user.email}がログイン中
            </div>

            <Spacer y={1} />

            <div className="text-center">
                <form onSubmit={Add}>
                <input type="text" onChange={handleChange} value={inputText} />
                <button onClick={Add}>
                ADD
                </button>
            </form>
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