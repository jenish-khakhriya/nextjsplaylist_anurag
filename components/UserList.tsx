import { url } from "@/constant/api";
import { createClientApi } from "@/services/api";
import Image from "next/image";


const UserList = ({ user, loading }) => {
    console.log(user, "ddd");

    const handleFollow = async (data) => {
        const api = await createClientApi();
        const response = await api.post(url.FOLLOW_REQUEST,{
            uname : data?.username
        });
        console.log(response);
    }
    return <>
        {user?.data?.map(item => {
            return <div className="w-full p-2 border-b border-b-black flex justify-between items-center">
                <div className="flex gap-3">
                    <div className="w-12 h-12 shrink-0 rounded-full">
                        <Image
                            src={`http://localhost:5000${item?.profileImage}`}
                            alt="profile"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div>{item?.username}</div>
                        <div>{item?.email}</div>
                    </div>
                </div>
                <div>
                    {item?.account_type}
                </div>
                <button onClick={() => {
                        handleFollow(item);
                }} className="px-3 py-1">
                    Follow
                </button>
            </div>
        })}
    </>
}
export default UserList;