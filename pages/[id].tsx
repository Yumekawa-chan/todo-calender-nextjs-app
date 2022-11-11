import { useRouter } from "next/router"

const Day = () => {
    const router= useRouter();
    const {id} = router.query;
    return (
        <>
        <div className="text-5xl text-center p-5">
            {id}
        </div>
        <div className="text-5xl text-center p-8">
            TODO LIST
        </div>
        </>
    )
}
export default Day;