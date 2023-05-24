import { Link } from "react-router-dom";
import { UserCircle, Chat, Heart } from "phosphor-react"
import { Post } from "../../Model/Post";
import Heading from "../Heading";
import Text from "../Text";
import { getProfile } from "../../services/auth";

interface PostItemProps {
    post: Post
    handleLike: (postId: string) => void
}

function PostItem({ post, handleLike }: PostItemProps) {
    return (
        <div className="border-b border-slate-400">
            <Heading className="flex items-center ml-5 my-4">
                <UserCircle size={48} weight="light"/>
                <Text className="font-extrabold ml-2">{post.profile.name}</Text>
            </Heading>
            <div className="ml-16 flex flex-col gap-2">
                <Link to={`/posts/${post._id}`}>
                    <Heading size="sm">{post.title}</Heading>
                </Link>
                {post.image ? (
                    <img
                        src={post.description.replace("192.168.0.120", "localhost")}
                        className="max-w-[270px] md:max-w-md lg:max-w-lg rounded-lg"
                    ></img>
                ) : (
                    <Text size="md" className="text-gray-light">
                        {post.description}
                    </Text>
                )}
                
            </div>
            <footer className="flex items-center ml-16 my-4 space-x-2">
                <Chat size={24} />
                    {post.comments && (
                    <>
                    <Text size="sm">{post.comments.length}</Text>
                    <div className="hover:bg-sky-400 rounded-full p-1" onClick={() =>  handleLike(post._id)}>
                        {post.likes.includes(getProfile()) ? (
                            <Heart size={24} className="text-red-500" weight="fill"/>
                        ) : (
                            <Heart size={24} />
                        )}
                    </div>
                    <Text size="sm">{post.likes.length}</Text>
                    </>
                )}
            </footer>
        </div>
    )
}

export default PostItem