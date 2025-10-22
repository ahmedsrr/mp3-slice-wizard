import { useCallback } from "react";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.type === "audio/mpeg" || file.type === "audio/mp3") {
          onFileSelect(file);
          toast.success("Fichier chargé avec succès!");
        } else {
          toast.error("Veuillez sélectionner un fichier MP3");
        }
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [".mp3"],
      "audio/mp3": [".mp3"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
        transition-all duration-300
        ${
          isDragActive
            ? "border-accent bg-accent/10 scale-105"
            : "border-border hover:border-primary hover:bg-card/50"
        }
      `}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
      <p className="text-lg font-medium mb-2">
        {isDragActive
          ? "Déposez le fichier ici..."
          : "Glissez-déposez votre fichier MP3"}
      </p>
      <p className="text-sm text-muted-foreground">
        ou cliquez pour sélectionner un fichier
      </p>
    </div>
  );
};
