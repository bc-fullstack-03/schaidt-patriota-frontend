import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useNavigate } from "react-router-dom";
import { getAuthHeader } from '../../services/auth';
import api from '../../services/api';


function AlertDialogDelete(){
    const navigate = useNavigate();

    async function handleDelete() {
      try {
        await api.delete('/users/me', getAuthHeader())
        localStorage.clear();
        alert('Conta deletada com sucesso')
        navigate("/");
      } catch (err) {
        alert('Erro ao tentar excluir a conta')
      }       
    }

    return (
        <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
        <button className="py-3 px-16 mt-6 bg-red-700 transition-colors hover:bg-red-500 rounded-md font-semibold" style={{ position: 'absolute', top: 0, right: 10 }}>
            Deletar Conta
        </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className='bg-black/70 inset-0 fixed' />
          <AlertDialog.Content className='fixed bg-[#121214] py-8 px-10 text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-96 shadow-lg shadow-black/25'>
            <AlertDialog.Title className='text=2xl font-extrabold'>
              Tem certeza que quer fazer isso?
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-3">
              Se você deletar a sua conta você vai se arrepender, pode ter certeza
            </AlertDialog.Description>
            <div className='flex flex-col gap-3 mt-4'>
              <AlertDialog.Cancel asChild>
                <button className='bg-zinc-600 px-5 h-12 rounded-md hover:bg-zinc-400 text-lg'>
                  Seja feliz e Cancele
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button onClick={handleDelete} className='bg-red-700 transition-colors hover:bg-red-500 px-5 h-12 rounded-md text-lg'>
                  Seja triste e Delete
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    )
}

export default AlertDialogDelete
