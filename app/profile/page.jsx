"use client";

import {useState,useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@/components/Profile';


const ProfilePage = () => {

    const {data:session} = useSession();
    const router = useRouter();

    const [posts,setPosts] = useState([]);

const handleEdit = (post)=>{
  router.push(`/update-prompt?id=${post._id}`)
}

const handleDelete = async (post)=>{

  const hasConfirmed = confirm("Are you Sure?!");

  if(hasConfirmed){

    try{

      const res = await fetch(`/api/prompt/${post._id}`,{
        method: "DELETE"
      });

      if(res.ok){
       
        const filtredPosts = posts.filter((p)=>p._id !== post._id);
        setPosts(filtredPosts);
      }

    } catch(err){
      throw new Error(err.message);
    }

  }


}

useEffect(()=>{

    const fetchPosts = async()=>{

      try{

        const res = await fetch(`/api/users/${session?.user?.id}/posts`);
        const data = await res.json();


        setPosts(data);

      } catch(err){

        console.log(err)
      }
    }

    if(session){

        fetchPosts();
    }


},[session])



  return (
    <div>

      <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      />

    </div>
  )
}

export default ProfilePage
