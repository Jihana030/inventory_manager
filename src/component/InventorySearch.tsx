import {useState} from "react";

type Props = {
    keyword: string;
    onSearch: (keyword:string)=>void;
}

export default function InventorySearch({keyword, onSearch}:Props){
    const [value, setValue] = useState<string>(keyword);

    return (
        <div className="inventory_search">
            <input id="inventory_search" type="text" placeholder="재고 검색"
                   onKeyDown={e=>{
                       if(e.key === "Enter") {
                           onSearch(value);
                       }
                   }}
                   onChange={e=>setValue(e.target.value)}
            />
            <label
                htmlFor="inventory_search"
                onClick={()=>onSearch(value)}>
                <span className="material-symbols-rounded">search</span>
            </label>
        </div>
    )
}