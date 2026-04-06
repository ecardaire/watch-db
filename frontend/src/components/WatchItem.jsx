import { Link } from "react-router-dom";

function WatchItem({ watch }) {
    return (
        <li>
            <Link to={`/watch/${watch.id}`}>
                <strong>{watch.brand}</strong> - {watch.model} ({watch.reference})
            </Link>
        </li>
    );
}

export default WatchItem;