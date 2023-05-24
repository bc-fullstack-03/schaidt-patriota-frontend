import {  useEffect, useState } from "react"
import api from "../../services/api"
import { getAuthHeader } from "../../services/auth"
import { UserCircle } from "phosphor-react"
import Heading from "../Heading"
import Text from "../Text"
import Button from "../Button"
import Profile from "../Profile"

interface Profile {
    _id: string
    name: string
    following: string[]
    followers: string[]
}

function FriendsList(){
    const authHeader = getAuthHeader()
    const [profiles, setProfiles] = useState<Profile[]>([])
    useEffect(() => {
        async function getProfiles() {
            try {
                const { data } = await api.get("/profiles", authHeader)
                setProfiles(data)
                console.log(data)
            } catch (err) {
                alert("Erro ao tentar obter os perfis")
            }
        }

        getProfiles()
    }, [])

    return (
        <div>
            <Heading className="ml-5 my-4">
                <Text size="lg" className="font-extrabold">Amigos</Text>
            </Heading>
            {profiles && profiles.map((profile) => (
                <div className="flex flex-col ml-5 w-full max-w-sm">
                <div className="flex items-center">
                    <UserCircle size={48} weight="thin" />
                    <Text className="ml-2 font-extrabold">{profile.name}</Text>
                </div>
                <div className="flex items-center ml-2">
                <Text>{profile.following.length > 0 && `${profile.following.length} seguindo`}</Text>
                </div>
                <div className="flex items-center ml-2">
                    <Text>{profile.followers.length > 0 && `${profile.followers.length} seguidores`}</Text>
                </div>
                <Button className="my-4 ml-2">Seguir</Button>
            </div>
            ))}        
        </div>
    )
}

export default FriendsList