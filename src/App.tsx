import InventoryList from "./component/InventoryList.tsx";
import Header from "./component/Header.tsx";
import InventoryEditor from "./component/InventoryEditor.tsx";
import Join from "./component/Join.tsx";
import {useEffect, useState} from "react";
import {supabase} from "./lib/supabase.ts";
import type {Session} from "@supabase/supabase-js";
import 'react-day-picker/dist/style.css';
import {ToastContainer} from "react-toastify";
import type {InventoryType} from "./types/InventoryType.ts";

function App() {
    const [session, setSession] = useState<Session | null>(null);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [inventoryList, setInventoryList] = useState<InventoryType[]>([]);
    const [selectedInventory, setSelectedInventory] = useState<InventoryType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const refreshInventory = async ()=>{
        setIsLoading(true);
        await getInventory();
    }

    async function getInventory(){
        try {
            const { data, error } = await supabase.from("inventory").select("*").is('deleted_at', null);

            if(error){
                console.error(error);
                setIsLoading(false);
                return;
            }
            setInventoryList(data ?? []);
        } catch (err){
            console.error(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(()=>{
        // 세션 정보 get
        supabase.auth.getSession().then(({data})=>{
            setSession(data.session);
        })

        // 변경 감지
        const {data: {subscription}} = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        )

        return ()=> subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if(session){
            getInventory();
        }
    }, [session]);

    return (
        <div>
            <Header user={session?.user}/>
            {!session && <Join/>}
            {
                session &&
                <div className="container">
                    <InventoryList
                        onAdd={()=> {
                            setIsOpenForm(true);
                        }}
                        onDetail={(item)=> {
                            setSelectedInventory(item);
                            setIsOpenDetail(true);
                        }}
                        inventoryList={inventoryList} isLoading={isLoading}
                    />

                    {isOpenForm && <InventoryEditor mode={"create"} onClose={()=>setIsOpenForm(false)} onSuccess={refreshInventory}/>}

                    {(isOpenDetail && selectedInventory) && <InventoryEditor mode={"edit"} onClose={()=>setIsOpenDetail(false)} item={selectedInventory} onSuccess={refreshInventory}/>}
                </div>
            }
            <ToastContainer position="top-center" theme="colored" />
        </div>
    )
}

export default App
