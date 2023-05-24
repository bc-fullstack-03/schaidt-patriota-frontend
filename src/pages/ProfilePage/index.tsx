import MainScreen from "../../components/MainScreen"
import Profile from "../../components/Profile"

import { useEffect, useState } from "react"
import api from "../../services/api"
import { getAuthHeader, getProfile } from "../../services/auth"
import { Post } from "../../Model/Post"
import { likePost, unLikePost } from "../../services/posts"

function ProfilePage() {
    const profile = getProfile()
    const [posts, setPosts] = useState<Post[]>([])
    const authHeader = getAuthHeader()

    useEffect(() => {
        async function  getPosts() {
            try {
                const { data } = await api.get("/feed", authHeader)  
                setPosts(data)             
            } catch(err) {
                alert('Erro ao obter o Feed')
            }
            
    
        }

        getPosts()
    }, [])

    async function postCreated(post: Post) {
        try {
            const { data } = await api.get(`/posts/${post._id}`, authHeader)
            setPosts((posts) => [data, ...posts])
        } catch (err) {
            alert('Erro ao tentar obter post salvo')
        }
    }

    async function handleLike(postId: string) {
        const [post, ...rest] = posts.filter((post) => post._id == postId)

        try {
            if(post && !post.likes.includes(profile)) {
                const newPost = await likePost(post, profile)
                changePosts(newPost)
            } else {
                const newPost = await unLikePost(post, profile)
                changePosts(newPost)
            }
        } catch (err) {
            alert('Erro ao tentar curtir a publicação')
        }
    }

    function changePosts(newPost: Post) {
        setPosts((posts) => {
            const post = newPost;
            const index = posts.indexOf(newPost)
            posts[index] = newPost
            return [...posts]
        })
    }

    return (
        <MainScreen>
            <Profile posts={posts} handleLike={handleLike}/>
        </MainScreen>
    )
}

export default ProfilePage