"use client";

import { useUserSearch } from "@/hook/useUserSearch";
import UserList from "./UserList";



const MainSearchBar = () => {

   const {handleSearch,loading,user} = useUserSearch();
   

    return <div className="w-full px-3 py-2 flex bg-amber-500    ">
        <div className="w-full grid grid-cols-7 gap-3">
            <div className="col-span-4 relative">
                <input type="text" onChange={(e) => {
                   handleSearch(e.target.value)     
                }} className="w-full rounded-lg py-2 px-3 tracking-widest outline-none border border-white text-white font-semibold" />
                <div className="w-full flex flex-col absolute min-h-[300px] max-h-[500px] border overflow-auto rounded-lg top-12">
                    <UserList user={user} loading={loading} />
            </div>
            </div>
        </div>
        
    </div>
}

export default MainSearchBar;