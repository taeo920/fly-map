import Spot from "./Spot";

function List({ filteredSpots }) {
    return (
        <ul className="list">
            {filteredSpots.map((spot, index) => (
                <Spot spot={spot} key={index} />
            ))}
        </ul>
    );
}

export default List;