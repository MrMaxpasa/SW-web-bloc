import { useState, useEffect } from 'react'
import axios from 'axios'

export function useFetchSWAPI(resource) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        axios
            .get(`https://www.swapi.tech/api/${resource}`)
            .then(res => {
                setData(res.data.results)
                setLoading(false)
            })
            .catch(err => {
                setError(err)
                setLoading(false)
            })
    }, [resource])

    return { data, loading, error }
}
