import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import List from './components/List';

function App() {
	const [spots, setSpots] = useState([]);
	const [filteredSpots, setFilteredSpots] = useState([]);
	const mapRef = useRef(null);

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyB_evBXbQAwYfxBsORRFa3sxyeToKr_kg8',
	})

	const onLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const handleBoundsChanged = useCallback(() => {
		if ( mapRef.current ) {
			const bounds = mapRef.current.getBounds();
			if (bounds) {
				const visibleSpots = spots.filter((spot) =>
				bounds.contains({ lat: spot.coordinates[0], lng: spot.coordinates[1] })
				);
				setFilteredSpots(visibleSpots);
			}
		}
	}, [spots]);

	useEffect(() => {
		fetch('/spots.json')
		.then((response) => response.json())
		.then((data) => setSpots(data))
		.catch((error) => console.error('Error fetching spots:', error));
	}, []);

	const googleMap = useMemo(() => {
		if (isLoaded) {
			return (
				<GoogleMap
				mapContainerClassName="map"
				center={{ lat: 39.0458, lng: -76.6413 }}
				zoom={8}
				options={{ mapTypeControl: false }}
				onLoad={onLoad}
				onBoundsChanged={handleBoundsChanged}
				>
				{spots.map((spot, index) => (
					<Marker key={index} position={{ lat: spot.coordinates[0], lng: spot.coordinates[1] }} />
				))}
				</GoogleMap>
			);
		}
	}, [isLoaded]);

	return (
		<div className="container">
			<List filteredSpots={filteredSpots} />
			{googleMap}
		</div>
	);
}

export default App;
