import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Section() {
    const newClient = useQueryClient()
    const mutation = useMutation((num) =>
        fetch(`http://localhost:3000/posts/${num}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }), {
        onSuccess: () => {
            newClient.invalidateQueries('post')
            window.confirm("Successfully deleted")
            window.location.reload()
        }
    })

    function deleteOpt(id) {
        mutation.mutate(id)
    }

    const fetcher = async () => {
        const res = await fetch("http://localhost:3000/posts");
        return res.json();
    }

    const { data: allPost, isLoading, error } = useQuery(['post'], fetcher)

    if (isLoading) return <div className="flex justify-center items-center space-x-2">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-500" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>

    if (error) return 'Error occurs ' + error.message

    return (
        <div className="container mx-auto">
            <div className="w-[32rem] p-5 mx-auto flex justify-start">
                <Link to='/add' className="w-96 p-2 rounded bg-emerald-400 font-semibold tracking-widest">+ Add Title</Link>
            </div>
            <div className="w-[32rem] mx-auto">
                {allPost.map((titl) => {
                    return (
                        <div className="flex flex-row items-center justify-center space-x-4" key={titl.id}>
                            <div className="w-96 border border-slate-300 rounded bg-emerald-50 font-medium p-2 tracking-wider">{titl.title}</div>
                            <Link to={`/edit/${titl.id}`}><i className="fa-regular fa-pen-to-square bg-sky-100 p-1 rounded text-blue-600 text-xl hover:cursor-pointer"></i></Link>
                            <i className="fa-regular fa-trash-can text-red-600 text-xl hover:cursor-pointer bg-red-100 p-1 rounded" onClick={() => deleteOpt(titl.id)}></i>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}