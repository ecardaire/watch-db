import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function WatchPage() {
    const { id } = useParams();
    const [watch, setWatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`http://localhost/watch-db/backend/api/getWatch.php?id=${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération de la montre");
                }
                return response.json();
            })
            .then((data) => {
                setWatch(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;
    if (!watch) return <p>Montre introuvable.</p>;

    return (
        <div style={{ padding: "20px" }}>
            <Link to="/">← Retour à la liste</Link>

            <h1>
                {watch.brand} {watch.model}
            </h1>

            <p>
                <strong>Référence :</strong> {watch.reference}
            </p>
            <p>
                <strong>Années :</strong> {watch.year_start} - {watch.year_end}
            </p>
            <p>
                <strong>Calibre :</strong> {watch.caliber}
            </p>
            <p>
                <strong>Diamètre :</strong> {watch.diameter_mm} mm
            </p>
            <p>
                <strong>Mouvement :</strong> {watch.movement_type}
            </p>
            <p>
                <strong>Description :</strong> {watch.description}
            </p>
        </div>
    );
}

export default WatchPage;