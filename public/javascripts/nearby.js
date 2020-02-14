$(document).ready(function() {
    $.ajax({
        url: '/getUser',
        type: 'POST',
        success: function (response) {
            if (response.status === 0) {
                sessionStorage.setItem('username', response.data.username);
                sessionStorage.setItem('userAvatar', response.data.userAvatar);
                sessionStorage.setItem('userExperience', response.data.userExperience);
                sessionStorage.setItem('userSkills', response.data.userSkills);
                sessionStorage.setItem('carCountry', response.data.carCountry);
                sessionStorage.setItem('carBrand', response.data.carBrand);
                sessionStorage.setItem('carModel', response.data.carModel);
                let userAvatar = sessionStorage.getItem('userAvatar');
                let avatarContent = `<img src="user-data/`+userAvatar+`" id="avatar" onclick="clickMenu()" alt="Avatar">`;
                $('.top').html(avatarContent);
                let socket = io(location.origin.replace(/^http/, 'ws'));
                socket.emit('login',{username:sessionStorage.getItem('username'),password:sessionStorage.getItem('password')});
                if (!sessionStorage.getItem('notifications')){
                    sessionStorage.setItem('notifications',"0");
                }
                socket.on('receiveNotifications',function(data){
                    storeNotifications(data)
                });
                loadScript();
            }else {
                window.location.href = '/login';
            }
        }})});


function searchByInput(e){
    if(e.which===13){
        let question = $('#searchPanel input').attr('value');
        myMap(question);
    }
}

function searchByChoose(keyword){
    $('#searchPanel input').attr('value',keyword);
    myMap(keyword);
    $('#searchPanel button').click();

}

function myMap(keyword) {
    var infowindow = new google.maps.InfoWindow();

    navigator.geolocation.getCurrentPosition(success, error);
    function success(position){

        let request = {
            location: {lat: position.coords.latitude, lng: position.coords.longitude},
            keyword: keyword,
            radius:1500
        };
        let mapProp= {
            center:new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
            zoom:13,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            // styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"lightness":"-100"},{"saturation":"-100"},{"gamma":"0.00"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"poi.medical","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"poi.sports_complex","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#000000"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#000000"},{"visibility":"on"}]}]
        };
        var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarkers(results[i]);
                }

                map.setCenter(results[0].geometry.location);
            }
        });

        function createMarkers(place) {
            var marker = new google.maps.Marker({
                map: map,
                position:place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
            });
        }

    }
    function error(err){
        switch(err.code){
            case 0: alert("Unknown Error");break;
            case 1: alert("PERMISSION_DENIED");break;
            case 2: alert("POSITION_UNAVAILABLE");break;
            case 3: alert("TIMEOUT");break;
            default:alert("Locate Failed");break;
        }
    }
}

function loadScript() {
    if(document.getElementById('google-map') !==null)
    {
        removeGoogleMapScript();
    }
    if(document.getElementById('google-map') ===null){
        addGoogleMapScript();
    }
}

function removeGoogleMapScript() {
    let keywords = ['maps.googleapis'];

    //Remove google from BOM (window object)
    window.google = undefined;

    //Remove google map scripts from DOM
    let scripts = document.head.getElementsByTagName("script");
    for (let i = scripts.length - 1; i >= 0; i--) {
        let scriptSource = scripts[i].getAttribute('src');
        if (scriptSource != null) {
            if (keywords.filter(item => scriptSource.includes(item)).length) {
                scripts[i].remove();
            }
        }
    }
}

function addGoogleMapScript() {
    removeGoogleMapScript();
    let dynamicScripts = [`https://maps.googleapis.com/maps/api/js?key=AIzaSyADVm9JzybvR2uJSTqJM6tQNPna9xY8nFo&libraries=places&callback=myMap`];
    for (let i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        // node.onload = myMap;
        document.head.appendChild(node);
    }

}
