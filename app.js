const express = require('express')
const app = express()



// thumbnails from video
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffprobe = require('ffprobe-static');

// Set the paths for ffmpeg and ffprobe
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobe.path);





app.get("/extract_screenshot_from_video", async (req, res) => {
    try {
      const videoPath = './public/uploads/video.mkv';
  
      ffmpeg(videoPath)
        .screenshots({
          timestamps: ['1%'], // Adjust as needed
          folder: './public/thumbnails/',
          filename: 'thumbnail.png',
          size: '320x240', // Adjust as needed
        })
        // .duration(3)
        // .save('./public/uploads/video.mp4')
        .on('end', () => {
          console.log('Thumbnail extraction finished.');
          res.send('Thumbnail extracted successfully.');
        })
        .on('error', (err) => {
          console.error('Error extracting thumbnail:', err);
          res.status(500).send('Error extracting thumbnail.');
        });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
  });
  




app.listen(5000 , () =>{
    console.log('server is running')
})