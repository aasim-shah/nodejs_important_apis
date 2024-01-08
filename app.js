const express = require('express')
const app = express()
const cities_json = require("./countries+states+cities.json")
const  { ErrorResponse , SuccessResponse} = require('./helpers/responseService')
var QRCode = require('qrcode');
const sharp = require("sharp");





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





app.get("/generate_qr" , async(req,res)=>{

     const qrStringData = await QRCode.toBuffer("some text")
    console.log({ qrStringData })
    const outputDirectory = './public/qr_codes/';
    sharp(qrStringData)
      .toFormat('webp', { quality: 80 })
      .resize(300, 300)
      .toFile(outputDirectory + "aasimshahh" + '_qrCode.webp', (err, info) => {
        if (err) { console.error(err) }
        if (info) { console.error(info) }
      });
        return SuccessResponse(res, "QRCode generate successfully")
})





/// all about geting counties-states-cities
function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  app.get("/countries", async (req, res) => {
    try {
  
      const countries = cities_json.map(item => item.name)
      return SuccessResponse(res, countries)
  
    } catch (error) {
      console.log({ error })
      return ErrorResponse(res, error.messege)
    }
  })
  
  
  app.get("/countries/:country", async (req, res) => {
    try {
      const country = capitalizeFirstLetter(req.params.country);
      console.log({ country })
      let countryInfo = cities_json.filter(item => {
        if (item.name === country) {
          return item.states
        }
      })
      const states = countryInfo[0].states.map((item) => item?.name)
  
      return SuccessResponse(res, states)
  
    } catch (error) {
      console.log({ error })
      return ErrorResponse(res, error.messege)
    }
  })
  
  
  
  app.get("/countries/:country/:state", async (req, res) => {
    try {
      const countryName = capitalizeFirstLetter(req.params.country);
      const stateName = capitalizeFirstLetter(req.params.state);
  
      let countryInfo = cities_json.filter(item => {
        if (item.name === countryName) {
          return item.states
        }
      })
      const states = countryInfo[0].states
  
      let stateInfo = states.filter(item => {
        if (item.name === stateName) {
          return item.cities
        }
      })
  
      const cities = stateInfo[0].cities.map(item => item.name)
      return SuccessResponse(res, cities)
  
    } catch (error) {
      console.log({ error })
      return ErrorResponse(res, error.messege)
    }
  })
  /// all about geting counties-states-cities



app.listen(5000 , () =>{
    console.log('server is running')
})