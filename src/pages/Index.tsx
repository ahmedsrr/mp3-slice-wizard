import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { AudioEditor } from "@/components/AudioEditor";
import { Scissors } from "lucide-react";

const Index = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-8">
        <header className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
              <Scissors className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              MP3 Cutter
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Découpez vos fichiers audio facilement et gratuitement
          </p>
        </header>

        <main className="flex flex-col items-center">
          {!audioFile ? (
            <div className="w-full">
              <FileUpload onFileSelect={setAudioFile} />
            </div>
          ) : (
            <AudioEditor file={audioFile} />
          )}
        </main>

        {audioFile && (
          <div className="text-center">
            <button
              onClick={() => setAudioFile(null)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Charger un autre fichier
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
