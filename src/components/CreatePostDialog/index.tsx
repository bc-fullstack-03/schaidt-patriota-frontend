import * as Dialog from '@radix-ui/react-dialog'
import Text from '../Text'
import { TextInput } from '../TextInput'
import Button from '../Button'
import { FormEvent } from 'react'
import api from '../../services/api'
import { getAuthHeader } from '../../services/auth'
import { Post } from '../../Model/Post'
import Dropzone from '../Dropzone'
import { useState } from 'react'


interface CreatePostDialogProps {
    postCreated?: (post: Post) => void;
}

interface PostFormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement
    description: HTMLInputElement
}

interface PostFormElement extends HTMLFormElement {
    readonly elements: PostFormElements
}

function CreatePostDialog({ postCreated }: CreatePostDialogProps) {
    const [selectedFile, setSelectFile] = useState<File>()    
    const authHeader = getAuthHeader()
    async function handleSubmit(event: FormEvent<PostFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData()
        formData.append("title", form.elements.title.value)
        formData.append("description", form.elements.description.value)
        if(selectedFile){
            formData.append("file", selectedFile)
        }
        try {
            const { data } = await api.post("/posts", formData, authHeader)
            postCreated && postCreated(data)
        } catch (err) {
            alert("Erro ao postar publicação")
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/70 inset-0 fixed' />
            <Dialog.Content className='fixed bg-[#121214] py-8 px-10 text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-96 shadow-lg shadow-black/25'>
                <Dialog.Title className='text=2xl font-extrabold'>Novo Post</Dialog.Title>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-4'>
                    <Text>Título do Post</Text>
                    <TextInput.Root>
                        <TextInput.Input id="title" placeholder='Um bom título pro seu título'/>
                    </TextInput.Root>

                    <Text>Conteúdo do Post</Text>
                    <TextInput.Root>
                        <TextInput.Input id="description" placeholder='Sobre o que você quer nos contar'/>
                    </TextInput.Root>

                    <Dropzone onFileUploaded={setSelectFile}/>

                    <div className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close type='button' className='bg-zinc-600 px-5 h-12 rounded-md hover:bg-zinc-400 text-lg'>Fechar</Dialog.Close>
                        <Button type='submit' className='flex-none w-28 text-slate-50 text-xl px-5 h-12'>Postar</Button>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default CreatePostDialog