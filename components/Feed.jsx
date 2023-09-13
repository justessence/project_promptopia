"use client";

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}  
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

export const Feed = () => {
  const [ searchText, setSearchText ] = useState('');
  const [ searchTimeout, setSearchTimeout ] = useState(null);
  const [ posts, setPosts ] = useState([]);
  const [ searchedResults, setSearchedResults ] = useState([]);


  function filterPrompts(serachtext) {
    const regex = new RegExp(serachtext, "i") // "i" flags for case-sensitive search

    return posts.filter(
      (post) => 
        regex.test(post.creator.username) || 
        regex.test(post.prompt) ||
        regex.test(post.tag)
    );
  }

  function handleSearchChange(e){
    setSearchTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  }

  function handleTagClick(tagName){
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  }

  useEffect(() => {
    const fecthPosts = async () => {
      const response = await fetch('./api/prompt')
      const data = await response.json();

      setPosts(data);
    }

    fecthPosts();
  }, []);


  return (
    <section className='feed'>
      <form className='relateive w-full flex-center' >
        <input 
          type="text" 
          placeholder='Search for a tag or a username' 
          value={searchText} 
          onChange={handleSearchChange}
          required
          className='search_input peer'/>
      </form>

      {searchText ? (
        <PromptCardList 
          data={searchedResults}
          handleTagClick={handleTagClick}
          />
        ) : (
          <PromptCardList 
            data={posts}
            handleTagClick={handleTagClick}
            />
      )}
    </section>
  )
}
