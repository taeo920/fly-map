function Spot({ spot, index }) {
    const getYouTubeId = (url) => {
        const videoId = url.split('v=')[1];
        return videoId;
    }

    return (
        <li className="spot" key={index}>
            <h2 className="spot__name">{spot.name}</h2>
            <div className="spot__description wysiwyg">{spot.description}</div>
            <div className="spot__videos">
                {spot.videos.map((video, index) => (
                    <a className="spot__video" key={index} href={`https://www.youtube.com/embed/${getYouTubeId(video)}`} target="_blank">
                        <img className="spot__thumbnail" src={`https://img.youtube.com/vi/${getYouTubeId(video)}/maxresdefault.jpg`} />
                    </a>
                ))}
            </div>
        </li>
    );
}

export default Spot;