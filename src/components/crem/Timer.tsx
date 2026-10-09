import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw, Timer as TimerIcon } from "lucide-react";

export function Timer({ minutes, onEnd }: { minutes: number; onEnd?: () => void }) {
  const [left, setLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const ended = useRef(false);

  useEffect(() => {
    setLeft(minutes * 60);
    setRunning(false);
    ended.current = false;
  }, [minutes]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (left === 0 && !ended.current) {
      ended.current = true;
      setRunning(false);
      onEnd?.();
    }
  }, [left, onEnd]);

  const h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
  const low = left < 10 * 60;
  return (
    <div className="flex items-center gap-2">
      <TimerIcon className="h-4 w-4 text-muted-foreground" />
      <span className={`font-mono tabular-nums text-lg ${low ? "text-destructive" : ""}`}>
        {h > 0 && `${h}:`}
        {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
      </span>
      <Button size="icon" variant="outline" onClick={() => setRunning((r) => !r)} aria-label={running ? "Pause" : "Démarrer"}>
        {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => {
          setLeft(minutes * 60);
          setRunning(false);
          ended.current = false;
        }}
        aria-label="Réinitialiser"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
}
