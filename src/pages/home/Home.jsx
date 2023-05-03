import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"
import Feed from "../../components/feed/feed"
import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const Home = () => {
  const [posts, setPosts] = useState([]);
  const axios = useAxiosPrivate();
  const { auth } = useAuth();

  useEffect(() => {
    const controller = new AbortController();

    axios.get("/api/posts/timeline/all/" + auth._id,{signal:controller}).then(response => {
          setPosts(response.data.sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date (p1.createdAt);
        }))
    })

    return () => {
      controller.abort();
    }
    
  }, [auth._id,axios])
  
  return (
    <div className="home">
      <Stories/>
      {/* <Share /> */}
      <Feed posts={posts} setPosts={setPosts}/>
      
      <Posts posts={posts} setPosts={setPosts}/>
    </div>
  )
}

export default Home