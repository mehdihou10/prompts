import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";


export const GET = async (req,{params})=>{

    try{

        await connectToDB();


        const posts = await Prompt.find({creator: params.userId}).populate("creator");


        return new Response(JSON.stringify(posts),{status: 200});

    } catch(err){
        
        return new Response("Failed to fetch this profile posts",{status: 500});
    }
}