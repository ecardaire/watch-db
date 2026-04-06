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

    if (loading) {
        return (
            <section className="section">
                <div className="container">
                    <p>Chargement...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="section">
                <div className="container">
                    <p>{error}</p>
                </div>
            </section>
        );
    }

    if (!watch) {
        return (
            <section className="section">
                <div className="container">
                    <p>Montre introuvable.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="section">
            <div className="container">
                <div className="mb-5">
                    <Link to="/" className="button is-light">
                        ← Retour à la liste
                    </Link>
                </div>

                <div className="card">
                    <div className="card-content">
                        <h1 className="title">
                            {watch.brand} {watch.model}
                        </h1>

                        <h2 className="subtitle">
                            Référence {watch.reference}
                        </h2>

                        <div className="columns is-multiline">
                            <div className="column is-half">
                                <p>
                                    <strong>Marque :</strong> {watch.brand}
                                </p>
                            </div>

                            <div className="column is-half">
                                <p>
                                    <strong>Modèle :</strong> {watch.model}
                                </p>
                            </div>

                            <div className="column is-half">
                                <p>
                                    <strong>Référence :</strong> {watch.reference}
                                </p>
                            </div>

                            <div className="column is-half">
                                <p>
                                    <strong>Calibre :</strong> {watch.caliber || "Non renseigné"}
                                </p>
                            </div>

                            <div className="column is-half">
                                <p>
                                    <strong>Année début :</strong> {watch.year_start || "Non renseignée"}
                                </p>
                            </div>

                            <div className="column is-half">
                                <p>
                                    <strong>Année fin :</strong> {watch.year_end || "Non renseignée"}
                                </p>
                            </div>

                            <div className="column is-half">
                                <p>
                                    <strong>Diamètre :</strong> {watch.diameter_mm ? `${watch.diameter_mm} mm` : "Non renseigné"}
                                </p>
                            </div>

                            <div className="column is-half">
                                <p>
                                    <strong>Mouvement :</strong> {watch.movement_type || "Non renseigné"}
                                </p>
                            </div>
                        </div>

                        <hr />

                        <div className="content">
                            <p className="has-text-weight-semibold">Description</p>
                            <p>{watch.description || "Aucune description disponible."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WatchPage;