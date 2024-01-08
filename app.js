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
  

  app.get('/pagination', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const pageSize = parseInt(req.query.pageSize) || 10; // Number of items per page, default is 10
  
    try {
      const totalCount = await User.countDocuments();
      const totalPages = Math.ceil(totalCount / pageSize);
  
      const data = await User.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize);
  
      res.json({
        data,
        totalPages,
        currentPage: page,
        pageSize,
        totalCount,
      });
    } catch (error) {
        return ErrorResponse(res, error.message);
    }
  });




app.listen(5000 , () =>{
    console.log('server is running')
})