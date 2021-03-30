import { useEffect, useState } from 'react';


const BlocBuilder = ({ bloc, builder }) => {
    const [snapshot, setSnapshot] = useState({
        data: null,
        error: null
    })
    useEffect(() => {
        bloc.subscribe(
            (data) => {
                setSnapshot({
                    data: data,
                    error: null
                })
            },
            (error) => {
                setSnapshot({
                    data: null,
                    error: error,
                })
            },
            () => {
                setSnapshot({
                    data: null,
                    error: null
                })
            }
        );
    }, [bloc])
    return (builder(snapshot))
}
export default BlocBuilder;