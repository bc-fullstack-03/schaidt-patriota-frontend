import { Post } from "../../Model/Post"
import { getAuthHeader, getProfile, getUser } from "../../services/auth"
import { unLikePost, likePost } from "../../services/posts"
import PostItem from "../PostItem"
import Text from "../Text"
import { UserCircle } from "phosphor-react"
import { TextInput } from "../TextInput"
import Button from "../Button"
import { FormEvent } from "react"
import api from "../../services/api"

interface PostDetailItemProps {
    postDetail: Post
    setPostDetail: (post: Post) => void
}

interface CommentFormElements extends HTMLFormControlsCollection {
    description: HTMLInputElement
}

interface CommentFormElement extends HTMLFormElement {
    readonly elements: CommentFormElements
}

function PostDetailItem({ postDetail, setPostDetail }: PostDetailItemProps) {
    const profile = getProfile()
    const user = getUser()
    
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

    async function handleSaveComment(event: FormEvent<CommentFormElement>) {
        event.preventDefault()
        const form = event.currentTarget

        const data = {
            description: form.elements.description.value
        }

        try {
            await api.post(`/posts/${postDetail._id}/comments`, data, getAuthHeader())
        
            const response = await api.get(`/posts/${postDetail._id}`, getAuthHeader())
            setPostDetail(response.data)
            form.elements.description.value = ""
        } catch (err) {
            alert('Erro ao tentar comentar na publicação')
        }
    }

    return (
        <div className="basis-5/6 overflow-y-auto scroll-smooth">
            <PostItem post={postDetail} handleLike={handleLike}/>
            <form onSubmit={handleSaveComment} className="mx-8 mb-8">
                <Text>Insira seu comentário</Text>
                <TextInput.Root>
                    <TextInput.Input id="description" placeholder="Manda a boa..."/>
                </TextInput.Root>
                <Button type="submit" className="mt-4">Add Comentário</Button>
            </form>
            <section className="border-t border-slate-400 w-full">
                <Text className="mx-8 font-extrabold">Comentários: </Text>
                <ul className="mx-8">
                    {postDetail.comments && postDetail.comments.map(comment => (
                        <li className="my-8 border rounded-lg" key={comment._id}>
                            <div className="flex items-center gap-2">
                                <UserCircle size={32} weight="light"/>
                                <Text size="sm">{comment.profile.name}</Text>
                            </div>
                            <Text>{comment.description}</Text>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default PostDetailItem