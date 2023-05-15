import { useEffect, useState } from "react";
import { getPlanets, PlanetsType } from "../requests/planets";
type Error = string;
const usePlanets = () => {
    const [planets, setPlanets] = useState<PlanetsType>()
    const [error, setError] = useState<Error>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getPlanets()
            .then((res) => {
                return res.json(); // Get the Response stream and convert to json
            })
            .then(data => {
                setPlanets(data); // Now this is the actual type
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return {
        planets,
        error,
        loading
    }
}

export default usePlanets