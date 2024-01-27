const express = require('express')
const mongoose = require('mongoose')
const routes = express.Router();
const crime = require('../model/crimeLocation')

routes.use(express.json());

routes.post('/crimeCoordinates', async (req, res)=> {
    try {
            const givenLat = req.body.latitude;
            const givenLng = req.body.longitude;
            console.log(req.body)

            const radiusInRadians = req.body.radius / 6371; 

            // geoJson structure query , also added virtual field coordinates in schema 
            //  for more details visit bellow links 
            // 1. https://www.mongodb.com/developer/products/mongodb/searching-nearby-points-interest-mapbox/
            // 2. https://medium.com/@ibraheemabukaff/find-nearest-locations-with-mongodb-how-to-2d6d84d0266f


            // const queryConditions = {
            //     coordinates: {
            //         $near: {
            //             $geometry: { type: "Point", coordinates: [parseFloat(givenLng), parseFloat(givenLat)] },
            //             $maxDistance: 10000  // 10 km
            //         }
            //     }
            // };
            // const test = await crime.find(queryConditions).limit(50);
            // console.log(test);
            const query = {
                Latitude: {
                    $gte: givenLat - radiusInRadians,
                    $lte: givenLat + radiusInRadians,
                },
                Longitude: {
                    $gte: givenLng - radiusInRadians,
                    $lte: givenLng + radiusInRadians,
                },
            };
            const data = await crime.find(query)

            res.json(data);
        } 
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
})

module.exports = routes;
