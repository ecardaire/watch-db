import { useEffect, useMemo, useState } from "react";
import WatchList from "../components/WatchList";

function HomePage() {
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("http://localhost/watch-db/backend/api/getWatches.php")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des données");
                }
                return response.json();
            })
            .then((data) => {
                setWatches(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const filteredWatches = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        if (!term) {
            return watches;
        }

        return watches.filter((watch) => {
            const brand = watch.brand?.toLowerCase() || "";
            const model = watch.model?.toLowerCase() || "";
            const reference = watch.reference?.toLowerCase() || "";

            return (
                brand.includes(term) ||
                model.includes(term) ||
                reference.includes(term)
            );
        });
    }, [watches, searchTerm]);

    if (loading) return <p className="section">Chargement...</p>;
    if (error) return <p className="section">{error}</p>;

    return (
        <section className="section">
            <div className="container">
                <h1 className="title">Vintage Watch DB</h1>
                <p className="subtitle">Base de données de montres vintage</p>

                <div className="field">
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Rechercher une marque, un modèle ou une référence..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <p className="mb-4">{filteredWatches.length} montre(s) trouvée(s)</p>

                {filteredWatches.length === 0 ? (
                    <p>Aucune montre ne correspond à la recherche.</p>
                ) : (
                    <WatchList watches={filteredWatches} />
                )}
            </div>
        </section>
    );
}

export default HomePage;