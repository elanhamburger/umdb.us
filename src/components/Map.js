import React from 'react';

import bus from '../img/bus.svg';
import my_location from '../img/my_location.svg';

import '../css/Map.css';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this);
        this.panTo = this.panTo.bind(this);
    }

    render() {
        return (
            <div id="Map">
                <div className="Map-Loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (!(window.google && window.google.maps)) {
            let s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyDJpOnkWxiMjRMY_CJOLQRAswjTHKnI3R0';
            s.addEventListener('load', (e) => this.initMap());

            let x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
        } else {
            this.initMap();
        }
    }

    componentDidUpdate(props) {
        if (this.props.selection !== props.selection) {
            props.selection && this.markers[props.selection.id].setIcon(bus);
            this.props.selection && this.markers[this.props.selection.id].setIcon();
        }
    }

    initMap() {
        const center = { lat: 38.98754114838913, lng: -76.9440220668912 };
        const bounds = new window.google.maps.LatLngBounds(
            { lat: 38.961104, lng: -77.314249 },
            { lat: 39.202175, lng: -76.779144 }
        );

        const options = {
            center: center,
            zoom: 16,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            restriction: {
                latLngBounds: bounds
            }
        };

        this.map = new window.google.maps.Map(
            document.getElementById('Map'),
            options
        );

        this.markers = { };

        fetch('https://api.momentumbus.com/stops.json')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let marker = new window.google.maps.Marker({
                    map: this.map,
                    position: { lat: data[i].lat, lng: data[i].lng },
                    title: data[i].name,
                    icon: bus
                });
                this.markers[data[i].id] = marker;
                marker.addListener('click', () => {
                    this.props.onStopSelected({
                        id: data[i].id,
                        name: data[i].name,
                        lat: data[i].lat,
                        lng: data[i].lng,
                        type: 'stop'
                    });
                });
            }
        });

        this.myLocationMarker = new window.google.maps.Marker({
            map: null,
            position: center,
            title: 'My Location',
            icon: {
                url: my_location,
                anchor: new window.google.maps.Point(12, 12)
            },
            size: new window.google.maps.Size(24, 24),
            zIndex: 999
        });
        this.myLocationRadius = new window.google.maps.Circle({
            map: null,
            strokeWeight: 0,
            fillColor: '#CCDAF0',
            fillOpacity: 0.35,
            center: center,
            radius: 1,
        });

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(position => {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                if (bounds.contains(pos)) {
                    this.myLocationMarker.setMap(this.map);
                    this.myLocationMarker.setPosition(pos);
                    this.myLocationRadius.setMap(this.map);
                    this.myLocationRadius.setCenter(pos);
                    this.myLocationRadius.setRadius(position.coords.accuracy);
                } else {
                    this.myLocationMarker.setMap(null);
                    this.myLocationRadius.setMap(null);
                }
            });
        }
    }

    panTo(coords) {
        this.map.panTo(coords);
    }
}