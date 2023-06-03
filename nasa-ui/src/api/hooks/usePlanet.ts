import { useEffect, useState } from "react";
import { DataType, getData, PlanetsType } from "../requests/planets";
type Error = string;
const usePlanets = () => {
    const [planets, setPlanets] = useState<DataType| string>('')
    const [error, setError] = useState<Error>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getData()
            .then(data => {
                setPlanets(data as DataType || data as string || ''); // Now this is the actual type
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