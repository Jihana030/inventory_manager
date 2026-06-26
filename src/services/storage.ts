import {supabase} from "../lib/supabase.ts";

export async function uploadThumbnail(file : File){
    const fileName = `${Date.now()}-${file.name}`;
    const {error} = await supabase.storage.from('thumbnail').upload(fileName, file);

    if(error) {
        console.error(error);
        throw error;
    }

    const {data} = supabase.storage.from('thumbnail').getPublicUrl(fileName);

    return data.publicUrl;
}