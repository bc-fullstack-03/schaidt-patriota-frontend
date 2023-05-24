import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import Text from "../Text";

interface DropzoneProps {
  onFileUploaded: (file: File) => void;
}

function Dropzone({ onFileUploaded }: DropzoneProps) {
  const [selectFileUrl, setSelectFileUrl] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    const fileURL = URL.createObjectURL(file);

    setSelectFileUrl(fileURL);
    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps} = useDropzone({ onDrop });

  return (
    <div className="flex mt-4" {...getRootProps()}>
      <input {...getInputProps()} />

      {selectFileUrl ? (
        <img src={selectFileUrl} className="max-h-96 rounded-lg" alt="Imagem selecionada" />
      ) : (
        <Text size="sm">Arraste a imagem para cá</Text>
      )}
    </div>
  );
}

export default Dropzone;