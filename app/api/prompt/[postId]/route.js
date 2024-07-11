import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { httpStatus } from "@/utils/http.status";


export const GET = async(req,{params})=>{

    try{

        await connectToDB();

        const post = await Prompt.findById(params.postId).populate("creator");

        if(!post){

        return new Response("Prompt not found!",{status: 404})

        }

        return new Response(JSON.stringify(post),{status: 200});

    } catch(err){

        return new Response("Failed to fetch post",{status: 500})
    }

}


export const PATCH = async (req,{params})=>{

    try {

        await connectToDB();

        const {prompt,tag} = await req.json();

        const post = await Prompt.findById(params.postId);

        post.prompt = prompt;
        post.tag = tag;

        await post.save();


        return new Response({status: httpStatus.SUCCESS},{status: 200})


    } catch(err){

        return new Response("Failed to Update post",{status: 500});
    }
}

export const DELETE = async (req,{params})=>{

    try{

        await connectToDB();

        await Prompt.findByIdAndDelete(params.postId);

        return new Response(JSON.stringify({status: httpStatus.SUCCESS}),{status: 202});


    } catch(err){

        return new Response('Failed to Delete Post',{status: 500});
    }
}