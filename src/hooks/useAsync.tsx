import { useState, useEffect } from "react";

interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: unknown;
}

type HandlerFunction<T, Args extends unknown[]> = (..._args: Args) => Promise<T>;

export default function useAsync<T, Args extends unknown[]>(
    handler: HandlerFunction<T, Args>,
    immediate = true,
): {
    data: T | null;
    loading: boolean;
    error: unknown;
    act: (..._args: Args) => Promise<T>;
} {
    const [state, setState] = useState<AsyncState<T>>({
        data: null,
        loading: immediate,
        error: null,
    });

    const act = async (...args: Args) => {
        setState((prevState) => ({ ...prevState, loading: true, error: null }));

        try {
            const data = await handler(...args);
            setState({ data, loading: false, error: null });
            return data;
        } catch (err) {
            if (err instanceof Error) {
                setState((prevState) => ({ ...prevState, loading: false, error: err }));
            } else {
                throw new Error("An unexpected error occurred");
            }
            throw err;
        }
    };

    const emptyArgsArray = [] as unknown[] as Args; // Forçar inferência de Args como um array vazio

    useEffect(() => {
        if (immediate) {
            act(...emptyArgsArray).catch((err) => console.error("Error during initial act:", err));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return { ...state, act };
}
