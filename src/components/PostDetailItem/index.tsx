import { Post } from "../../Model/Post"
import { getProfile} from "../../services/auth"
import { unLikePost, likePost } from "../../services/posts"
import PostComments from "../PostComments"
import PostItem from "../PostItem"


interface PostDetailItemProps {
    postDetail: Post
    setPostDetail: (post: Post) => void
}

function PostDetailItem({ postDetail, setPostDetail }: PostDetailItemProps) {
    const profile = getProfile()
    
    async function handleLike() {
        try {
            if(postDetail.likes.includes(profile)){
                const newPost = await unLikePost(postDetail, profile)
                setPostDetail({...newPost})
            } else {
                const newPost = await  likePost(postDetail, profile)
                setPostDetail({...newPost})
            }
        } catch (err) {
            alert('Erro ao tentar curtir')
        }
    }

    return (
        <div className="basis-5/6 overflow-y-auto scroll-smooth">
            <PostItem post={postDetail} handleLike={handleLike}/>
            <PostComments postDetail={postDetail} setPostDetail={setPostDetail}/>
        </div>
    )
}

export default PostDetailItem