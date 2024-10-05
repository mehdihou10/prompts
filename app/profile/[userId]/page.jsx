"use client";

import Profile from "@/components/Profile"
import {useState,useEffect} from 'react';



const UserProfile = ({params}) => {

    const [posts,setPosts] = useState([]);

    useEffect(()=>{

        const fetchPosts = async ()=>{

            const res = await fetch(`/api/users/${params.userId}/posts`);
            const data = await res.json();

            setPosts(data);

        }

        fetchPosts();
    },[])


  return (
    <div>

        <Profile
        data={posts}
        name={posts.length !== 0 ? posts[0].creator.username : ""}
        
        />

    </div>
  )
}

export default UserProfile
