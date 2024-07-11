"use client";

import {useState,useEffect} from 'react'
import { useRouter,useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Form from '@/components/Form';


const UpdatePrompt = () => {


    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    const [submit,setSubmit] = useState(false);

    const [post,setPost] = useState({
        promptText: "",
        tag: ""
    })

    useEffect(()=>{

        const fetchPost = async()=>{

            try{

                const res = await fetch(`/api/prompt/${promptId}`);
                const data = await res.json();

                setPost({
                    promptText: data.prompt,
                    tag: data.tag
                })

            } catch(err){
                throw new Error(err.message);
            }
        }

        if(promptId) fetchPost();


    },[promptId]);


    const updatePrompt = async (e)=>{

      e.preventDefault();
      setSubmit(true)

      try{

        const res = await fetch(`/api/prompt/${promptId}`,{
          method: "PATCH",
          body: JSON.stringify({

            prompt: post.promptText,
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

    <Suspense fallback={<div>Loading...</div>}>

    <div>
      <Form

      type="edit"
      post={post}
      setPost={setPost}
      submited={submit}
      handleSubmit={updatePrompt}

      />


    </div>

    </Suspense>
  )
}

export default UpdatePrompt
