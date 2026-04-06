import WatchItem from "./WatchItem";

function WatchList({ watches }) {
    return (
        <ul>
            {watches.map((watch) => (
                <WatchItem key={watch.id} watch={watch} />
            ))}
        </ul>
    );
}

export default WatchList;