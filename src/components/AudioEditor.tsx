import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions";
import { Play, Pause, Scissors, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AudioEditorProps {
  file: File;
}

export const AudioEditor = ({ file }: AudioEditorProps) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const regionsRef = useRef<RegionsPlugin | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [region, setRegion] = useState<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });

  useEffect(() => {
    if (!waveformRef.current) return;

    const regions = RegionsPlugin.create();
    regionsRef.current = regions;

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "hsl(263, 70%, 50%)",
      progressColor: "hsl(188, 94%, 55%)",
      cursorColor: "hsl(188, 94%, 55%)",
      barWidth: 2,
      barGap: 1,
      height: 128,
      plugins: [regions],
    });

    wavesurferRef.current = wavesurfer;

    wavesurfer.on("ready", () => {
      const duration = wavesurfer.getDuration();
      setDuration(duration);
      
      // Create initial region (full audio)
      regions.addRegion({
        start: 0,
        end: duration,
        color: "rgba(136, 92, 246, 0.3)",
        drag: true,
        resize: true,
      });
    });

    wavesurfer.on("audioprocess", () => {
      setCurrentTime(wavesurfer.getCurrentTime());
    });

    wavesurfer.on("play", () => setIsPlaying(true));
    wavesurfer.on("pause", () => setIsPlaying(false));

    regions.on("region-updated", (region) => {
      setRegion({ start: region.start, end: region.end });
    });

    wavesurfer.loadBlob(file);

    return () => {
      wavesurfer.destroy();
    };
  }, [file]);

  const handlePlayPause = () => {
    wavesurferRef.current?.playPause();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCut = async () => {
    if (!wavesurferRef.current) return;

    try {
      const audioBuffer = wavesurferRef.current.getDecodedData();
      if (!audioBuffer) return;

      const audioContext = new AudioContext();
      const sampleRate = audioBuffer.sampleRate;
      const startSample = Math.floor(region.start * sampleRate);
      const endSample = Math.floor(region.end * sampleRate);
      const newLength = endSample - startSample;

      const newBuffer = audioContext.createBuffer(
        audioBuffer.numberOfChannels,
        newLength,
        sampleRate
      );

      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const oldData = audioBuffer.getChannelData(channel);
        const newData = newBuffer.getChannelData(channel);
        for (let i = 0; i < newLength; i++) {
          newData[i] = oldData[startSample + i];
        }
      }

      // Convert to WAV and download
      const wav = audioBufferToWav(newBuffer);
      const blob = new Blob([wav], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cut-${file.name.replace(".mp3", ".wav")}`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("Fichier découpé avec succès!");
    } catch (error) {
      toast.error("Erreur lors du découpage du fichier");
      console.error(error);
    }
  };

  const audioBufferToWav = (buffer: AudioBuffer) => {
    const length = buffer.length * buffer.numberOfChannels * 2 + 44;
    const arrayBuffer = new ArrayBuffer(length);
    const view = new DataView(arrayBuffer);
    const channels = [];
    let offset = 0;
    let pos = 0;

    const setUint16 = (data: number) => {
      view.setUint16(pos, data, true);
      pos += 2;
    };

    const setUint32 = (data: number) => {
      view.setUint32(pos, data, true);
      pos += 4;
    };

    // WAV header
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"

    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(buffer.numberOfChannels);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * buffer.numberOfChannels); // avg. bytes/sec
    setUint16(buffer.numberOfChannels * 2); // block-align
    setUint16(16); // 16-bit

    setUint32(0x61746164); // "data" - chunk
    setUint32(length - pos - 4); // chunk length

    for (let i = 0; i < buffer.numberOfChannels; i++) {
      channels.push(buffer.getChannelData(i));
    }

    while (pos < length) {
      for (let i = 0; i < buffer.numberOfChannels; i++) {
        let sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }

    return arrayBuffer;
  };

  return (
    <div className="space-y-6 w-full max-w-4xl">
      <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
        <div ref={waveformRef} className="mb-4" />
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <div className="text-sm text-muted-foreground">
            Sélection: {formatTime(region.end - region.start)}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handlePlayPause}
            variant="default"
            size="lg"
            className="flex-1"
          >
            {isPlaying ? (
              <>
                <Pause className="mr-2 h-5 w-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5" />
                Lecture
              </>
            )}
          </Button>

          <Button
            onClick={handleCut}
            variant="secondary"
            size="lg"
            className="flex-1"
          >
            <Scissors className="mr-2 h-5 w-5" />
            Découper
          </Button>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>Glissez les bords de la zone colorée pour sélectionner la partie à conserver</p>
      </div>
    </div>
  );
};
