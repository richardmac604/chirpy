/* eslint-disable @typescript-eslint/dot-notation */
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";

import { api } from "npm/utils/api";

export default function Home() {

  const CreatePost = () => {

    const {user} = useUser();

    if(!user){
      return null
    }
    
    return(
      <div>
        <img src = {user?.imageUrl} alt="Profile image"/>
      </div>
    )
  }


  const user = useUser();

  const {data, isLoading} = api.post.getAll.useQuery();

  if (isLoading) return <div>...loading</div>;

  if (!data) return <div>Something went wrong</div>;
  
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
        {!!user.isSignedIn && <SignOutButton/>}
        {user.isSignedIn && <CreatePost/>}
        </div>
        <div>
          {[...data,...data].map((post) => (<div key = {post['id']} >{post['content']}</div>))}
        </div>d
      </main>
 
    </>
  );
}
