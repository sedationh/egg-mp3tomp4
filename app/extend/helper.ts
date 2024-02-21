import ffmpeg from 'fluent-ffmpeg';
import path from 'node:path';


interface EggFile {
  field: string;
  filename: string;
  encoding: string;
  mime: string;
  filepath: string;
}

const publicPath = path.join(__dirname, '../public/mp4');

export const filesToMp4 = async (files:EggFile[]) => {
  const mp4Links: string[] = [];

  const convertFileToMp4 = file => {
    return new Promise<void>((resolve, reject) => {
      const { filename, filepath } = file;
      const outputFilename = `${filename}.mp4`;
      const outputPath = path.join(publicPath, outputFilename);

      // TODO: 指令需要再优化
      ffmpeg(filepath)
        .output(outputPath)
        .input('color=c=black:s=1280x720')
        .inputOptions('-f lavfi')
        .outputOptions('-shortest')
        .outputOptions('-fflags +shortest')
        .on('end', () => {
          const mp4Link = `/mp4/${outputFilename}`;
          mp4Links.push(mp4Link);
          resolve();
        })
        .on('error', (err, stdout, stderr) => {
          console.error('An error occurred:', err.message);
          console.error('FFmpeg output:', stdout);
          console.error('FFmpeg error output:', stderr);
          reject(err);
        })
        .run();
    });
  };

  await Promise.all(files.map(convertFileToMp4));

  return mp4Links;
};
