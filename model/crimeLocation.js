const mongoose = require('mongoose')
const {Schema } = mongoose;

const crimeCoordinates = new Schema({
    Latitude: Number, 
    Longitude: Number,
    Location: String

});


// added virtual schema for geoJson structure 
// crimeCoordinates.virtual('coordinates').get(function () {
//     return {
//         type: 'Point',
//         coordinates: [this.Longitude, this.Latitude]
//     };
// });

// crimeCoordinates.set('toObject', { virtuals: true });
// crimeCoordinates.set('toJSON', { virtuals: true });

// crimeCoordinates.index({ coordinates: '2dsphere' });



module.exports = mongoose.model("crime_logs", crimeCoordinates);




