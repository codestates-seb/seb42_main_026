import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { useCallback, useState } from 'react';

const useFFmpeg = () => {
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState<number | undefined>(undefined);

  const ffmpeg = createFFmpeg({
    mainName: 'main',
    // log: true,
    corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
  });

  const load = useCallback(async () => {
    setIsReady(false);
    setProgress(0);
    await ffmpeg.load();
    setIsReady(true);
  }, [ffmpeg]);

  const convertToMp3 = useCallback(
    async (input: Blob, output: string) => {
      setIsReady(false);
      setProgress(0);
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(input);
      return new Promise<Blob>((resolve, reject) => {
        fileReader.onload = async () => {
          ffmpeg.FS('writeFile', 'input.webm', new Uint8Array(fileReader.result as ArrayBuffer));
          await ffmpeg.run('-i', 'input.webm', '-vn', '-ar', '44100', '-ac', '2', '-ab', '192k', '-f', 'mp3', output);
          const data = ffmpeg.FS('readFile', output);
          const mp3Blob = new Blob([data.buffer], { type: 'audio/mp3' });
          setIsReady(true);
          resolve(mp3Blob);
        };
        fileReader.onerror = (event) => {
          reject(event);
        };
      });
    },
    [ffmpeg]
  );

  const cancel = useCallback(() => {
    ffmpeg.FS('unlink', 'input.webm');
    ffmpeg.FS('unlink', '/dev/stdout');
    ffmpeg.FS('unlink', '/dev/stderr');
    ffmpeg.exit();
  }, [ffmpeg]);

  const getBlob = useCallback(async (input: string) => {
    const data = await fetchFile(input);
    return new Blob([data]);
  }, []);

  return { isReady, load, convertToMp3, progress, cancel, getBlob };
};

export default useFFmpeg;
