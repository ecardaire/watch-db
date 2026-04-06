import { Link } from "react-router-dom";

function WatchItem({ watch }) {
    return (
        <div className="card">
            <div className="card-content">
                <p className="title is-5">
                    {watch.brand} {watch.model}
                </p>

                <p className="subtitle is-6">
                    Réf. {watch.reference}
                </p>

                <div className="content">
                    <p>
                        <strong>Calibre :</strong> {watch.caliber || "Non renseigné"}
                    </p>
                    <p>
                        <strong>Années :</strong> {watch.year_start} - {watch.year_end}
                    </p>
                    <p>
                        <strong>Mouvement :</strong> {watch.movement_type || "Non renseigné"}
                    </p>
                </div>

                <Link to={`/watch/${watch.id}`} className="button is-link is-light">
                    Voir la fiche
                </Link>
            </div>
        </div>
    );
}

export default WatchItem;