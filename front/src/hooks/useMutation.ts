import { useState, useCallback } from "react";
import { toast } from 'react-toastify';

import { Axios, AxiosResponse } from "src/configs/http";

import { HttpMethod } from "src/helpers/constants";

type MutationOption = {
    url: string;
    method: HttpMethod;
    body?: any;
};

export default function useMutation<T>() {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);

    const handleError = (error: any) => {
        setError(error?.response?.data);
        toast.error(error?.response?.data)
    };

    const handleSuccess = async (options: MutationOption) => {
        const res: AxiosResponse<T> = await Axios[options.method]<T>(
            options.url,
            options.body
        );

        setData(res.data);
    };

    // this function is calling useCallback to stop an infinite loop since it is in the dependency array of useEffect
    const runMutate = useCallback((options: MutationOption) => {
        setLoading(true);

        handleSuccess(options).catch(e => {
            handleError(e)
        }).finally(() => {
            setLoading(false);
        })

    }, []);

    return { data, loading, error, execute: runMutate };
}