import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import {httpStatus} from '@/utils/http.status';

export const POST = async (req)=>{


    const {userId,prompt,tag} = await req.json();

    try{

        await connectToDB();

        await Prompt.create({
            creator: userId,
            prompt,
            tag
        })

        return new Response(JSON.stringify({status: httpStatus.SUCCESS}),{status: 201});

    } catch(err){
        new Response("Failed to create new prompt",{status: 500})
    }

}