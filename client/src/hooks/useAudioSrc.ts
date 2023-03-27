import { useEffect, useState } from 'react';

export const useAudioSrc = (recordedBlob: Blob | null) => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  const reset = () => {
    if (audioSrc) {
      URL.revokeObjectURL(audioSrc);
      setAudioSrc(null);
    }
  };

  useEffect(() => {
    if (recordedBlob) {
      const src = URL.createObjectURL(recordedBlob);
      setAudioSrc(src);
      return () => {
        URL.revokeObjectURL(src);
      };
    }
  }, [recordedBlob]);

  return { audioSrc, reset };
};
