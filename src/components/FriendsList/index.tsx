import { useEffect, useState } from "react";
import api from "../../services/api";
import { getAuthHeader, getProfile } from "../../services/auth";
import { UserCircle } from "phosphor-react";
import Heading from "../Heading";
import Text from "../Text";
import Button from "../Button";
import Profile from "../Profile";

interface Profile {
  _id: string;
  name: string;
  following: string[];
  followers: string[];
}

function FriendsList() {
  const authHeader = getAuthHeader();
  const myProfileId = getProfile();
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    async function getProfiles() {
      try {
        const { data } = await api.get("/profiles", authHeader);
        setProfiles(data);
      } catch (err) {
        alert("Erro ao tentar obter os perfis");
      }
    }

    getProfiles();
  }, []);

  async function handleFollow(profileId: string) {
    try {
      const profileIndex = profiles.findIndex((profile) => profile._id === profileId);

      if (profileIndex === -1) {
        return;
      }

      const profile = profiles[profileIndex];

      if (profile.followers.includes(myProfileId)) {
        return;
      }

      await api.post(`/profiles/${profileId}/follow`, null, authHeader);

      const updatedProfiles = [...profiles];
      updatedProfiles[profileIndex] = {
        ...profile,
        followers: [...profile.followers, myProfileId],
      };

      setProfiles(updatedProfiles);
    } catch (err) {
      alert("Erro ao tentar seguir o usuário");
    }
  }

  return (
    <div className="basis-5/6 overflow-y-auto scroll-smooth">
      <Heading className="border-b border-slate-400 mt-4 my-5">
        <Text size="lg" className="font-extrabold ml-5">
          Amigos
        </Text>
      </Heading>
      <ul>
        {profiles &&
          profiles.map((profile) => {
            if (profile._id === myProfileId) {
              return null;
            }
            return (
              <li
                key={profile._id}
                className="flex flex-col ml-5 my-5  w-full max-w-sm"
              >
                <div className="flex items-center">
                  <UserCircle size={48} weight="thin" />
                  <Text className="ml-2 font-extrabold">{profile.name}</Text>
                </div>
                <div className="flex items-center ml-2">
                  <Text>
                    {profile.following.length > 0 &&
                      `${profile.following.length} seguindo`}
                  </Text>
                </div>
                <div className="flex items-center ml-2">
                  <Text>
                    {profile.followers.length > 0 &&
                      `${profile.followers.length} seguidores`}
                  </Text>
                </div>
                <Button
                    className={`my-4 ml-2 ${profile.followers.includes(myProfileId) ? "bg-gray-400 hover:bg-gray-400" : ""}`}
                    onClick={() => handleFollow(profile._id)}
                    disabled={profile.followers.includes(myProfileId)}
                >
                    {profile.followers.includes(myProfileId) ? "Seguindo" : "Seguir"}
                </Button>

              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default FriendsList;