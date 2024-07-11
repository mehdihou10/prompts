"use client";

import {useState} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';


const CreatePrompt = () => {

    const {data: session} = useSession();

    const router = useRouter();

    const [submit,setSubmit] = useState(false);

    const [post,setPost] = useState({
        promptText: "",
        tag: ""
    })


    const createPrompt = async (e)=>{

      e.preventDefault();
      setSubmit(true)

      try{

        const res = await fetch('/api/prompt/new',{
          method: "POST",
          body: JSON.stringify({

            prompt: post.promptText,
            userId: session?.user.id,
            tag: post.tag

          })
        })

        if(res.ok){
          router.push("/");
        }

      } catch(err){
        alert(err.message);
      } finally{
        setSubmit(false);
      }

    }


  return (
    <div>
      <Form

      type="create"
      post={post}
      setPost={setPost}
      submited={submit}
      handleSubmit={createPrompt}

      />


    </div>
  )
}

export default CreatePrompt
