import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";


export const POST = async (req)=>{

    try{

        await connectToDB();

        let {text} = await req.json();

        text = text.toLowerCase(); 

        const posts = await Prompt.find().populate("creator");

        const filtredPosts = posts.filter((pst)=>pst.prompt.toLowerCase().includes(text) || pst.tag.toLowerCase().includes(text) || pst.creator.username.toLowerCase().includes(text));

        return new Response(JSON.stringify(filtredPosts),{status: 200});

    } catch(err){

        return new Response("Failed to fetch",{status: 500});
    }
}