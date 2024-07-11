"use client";

import {useState,useEffect} from 'react'

import PromptCard from './PromptCard';

const PromptCardList = ({data,handleTagClick})=>{

  return (

    <div className="mt-16 prompt_layout">

      {
        data.map((post)=><PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />)
      }
    </div>
  )
}


const Feed = () => {

  const [searchText,setSearchText] = useState("");
  const [posts,setPosts] = useState([]);



  useEffect(()=>{

    const handleSearchChange = async()=>{


      const res = await fetch("/api/prompt/search",{
        method: "POST",
        body: JSON.stringify({text: searchText})
      });
  
      const data = await res.json();
  
      setPosts(data);
  
    }

    handleSearchChange();

  },[searchText])

  const handleTagClick = (tag)=>{
    
    setSearchText(tag);
  }


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>

        <input
         type="text"
         placeholder='Search for a tag or username'
         value={searchText}
         onChange={(e)=>setSearchText(e.target.value)}
         required
         className='search_input peer'
          />
      </form>

      <PromptCardList 
      data={posts}
      handleTagClick={handleTagClick}

      />
    </section>
  )
}

export default Feed
