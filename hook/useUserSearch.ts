import { url } from "@/constant/api";
import { createClientApi } from "@/services/api";
import { useCallback, useEffect, useState } from "react";

let timeOut = null;
export const useUserSearch = () => {
    
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(false);
    const [search,setSearch] = useState("")

    const fetchUserSearch = useCallback(async (search : string) => {
        try{
            setLoading(prev => true);
            const api =  await createClientApi();
            const response = await api.get(`${url.SEARCH_USER}?limit=10&search=${search}`);
            setUser(prev => response);
        }
        catch(err){
                setUser(prev => null);

        }
        finally{
            setLoading(prev => false);

        }
    },[]);

    const handleSearch = useCallback((value) => {
        clearTimeout(timeOut);

        timeOut = setTimeout(() => {
            if(!value.trim()){
                setUser(prev => null);
                return;
            }
            fetchUserSearch(value);
        },300);
        
    },[]);

    useEffect(()=>{
        fetchUserSearch("");
    },[]);


    return {handleSearch,loading,user};
}