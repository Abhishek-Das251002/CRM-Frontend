import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setData(data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false)
        })
    },[url])

    return {data, loading, error}
}

export default useFetch;