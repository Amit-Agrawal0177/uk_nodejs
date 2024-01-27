let Latitude = 54.714537
let Longitude = -3.496102
async function initMap() {
    var coordinates = { lat: 54.714537, lng: -3.496102 };
    var mapOptions = {
        center: coordinates,
        zoom: 15,
        mapTypeId: "satellite"
    };
    var googlemap = new google.maps.Map(document.getElementById("map"), mapOptions);
    const trafficLayer = new google.maps.TrafficLayer();

    trafficLayer.setMap(googlemap);

    var marker = new google.maps.Marker({
        position: coordinates,
        map: googlemap
    });
    
    
    let res = await fetchData();
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: res,
        map: googlemap,
    });
    
}

async function fetchData(){
    try {
        const response = await axios.post('http://localhost:8200/map/crimeCoordinates/', {latitude: Latitude, longitude: Longitude, radius: 20 });
        console.log("fetch data", response.data)
        return response.data.map(point => new google.maps.LatLng(point.Latitude, point.Longitude));

    }
    catch(error) {
        console.log(`error found ${error}`);
    }
}