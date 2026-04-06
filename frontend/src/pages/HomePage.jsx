import { useEffect, useState } from "react";
import WatchList from "../components/WatchList";

function HomePage() {
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Vintage Watch DB</h1>
            <WatchList watches={watches} />
        </div>
    );
}

export default HomePage;