import WatchItem from "./WatchItem";

function WatchList({ watches }) {
    return (
        <div className="columns is-multiline">
            {watches.map((watch) => (
                <div className="column is-half" key={watch.id}>
                    <WatchItem watch={watch} />
                </div>
            ))}
        </div>
    );
}

export default WatchList;