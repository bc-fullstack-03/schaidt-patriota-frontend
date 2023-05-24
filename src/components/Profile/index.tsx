import { UserCircle } from "phosphor-react";
import Heading from "../Heading";
import Text from "../Text";
import PostItem from "../PostItem";
import { Post } from "../../Model/Post";
import AlertDialogDelete from "../AlertDialogDelete";

interface ProfileProps {
  posts: Post[];
  handleLike: (postId: string) => void;
}

function Profile({ posts, handleLike }: ProfileProps) {
  const user = localStorage.getItem("user");
  const userPosts = posts.filter((post: Post) => post.profile.name === user);

  return (
    <div className="basis-5/6">
      <div>
        <Heading className="border-b border-slate-400 mt-4 mb-4">
          <Text size="lg" className="font-extrabold ml-5">
            Perfil
          </Text>
          <div className="ml-5 my-4 w-full max-w-sm">
            <div className="flex items-center flex-1 my-4">
              <UserCircle size={48} weight="light" />
              <Text className="font-extrabold ml-2">{user}</Text>
              <Text> AQUI</Text>
              <AlertDialogDelete />
            </div>
          </div>
        </Heading>
        <section>
          {userPosts.map((post: Post) => (
            <PostItem post={post} handleLike={handleLike} key={post._id} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default Profile;


