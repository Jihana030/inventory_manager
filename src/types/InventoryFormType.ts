export type InventoryFormType = {
    no : number;
    name : string;
    category : string;
    option_name : string;
    thumbnail: FileList;
    count: number;
    safe_count: number;
    current_buy: Date | undefined;
    memo: string;
};