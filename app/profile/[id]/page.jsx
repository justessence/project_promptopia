"use client";

import { useState, useEffect } from "react";

import Profile from "@components/Profile";
import { useSearchParams } from 'next/navigation';

const OtherProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params?.id}/posts`)
        const data = await response.json();

        console.log("datanya : ", data);

        setPosts(data);
    }

    if(params?.id) fetchPosts();
  }, [params?.id]);
  

  return (
    <Profile 
      name={`${userName} `}
      desc={`Welcome to ${userName} personalized profile page`}
      data={posts}
    />
  )
}

export default OtherProfile;
