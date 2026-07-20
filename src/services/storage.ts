import {supabase} from "../lib/supabase.ts";

export async function uploadThumbnail(file : File){
    const ext = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${ext}`;
    const {error} = await supabase.storage.from('thumbnail').upload(fileName, file);

    if(error) {
        console.error(error);
        throw error;
    }

    return fileName;
}

export function getThumbnailUrl(path: string) {
    return supabase.storage.from('thumbnail').getPublicUrl(path).data.publicUrl;
}