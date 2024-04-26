import axios from 'axios';
import { useEffect, useState } from 'react';

const useAxios = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsloaging] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                console.log(response.data)
                setData(response.data);
                setIsloaging(false);
            })
            .catch((error) => {
                setError(error);
                setIsloaging(false);
            });
    }, [url]);
    return { data, isLoading, error }
}

export default useAxios