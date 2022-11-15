import React ,{useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Edit() {
    const { id } = useParams()
    const [name, setName] = useState('')
    function changedValue(e) {
        setName((gotValue) => {
            return (
                { ...gotValue, [e.target.name]: e.target.value }
            )
        })
    }

    const navigate = useNavigate()

    function changeFunc(newTitle) {
        fetch(`http://localhost:3000/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTitle)
        })
    }

    const newClient = useQueryClient()
    const mutation = useMutation((newTitle) => changeFunc(newTitle), {
        onSuccess: () => {
            newClient.invalidateQueries('post')
            navigate('/')
            window.location.reload()
        }
    })

    function submitTitle(e) {
        e.preventDefault()
        mutation.mutate(name)
    }

    mutation.isLoading ? <div>...Loading</div> : mutation.isError ? <div>Error occurs</div> : null && mutation.isSuccess ? <div>Title added</div> : null

    return (
        <div className="container mx-auto flex items-center justify-center h-screen">
            <form className="w-96 space-y-4" onSubmit={submitTitle}>
                <input type="text" name="title" className="mt-1 p-3 bg-white border shadow-sm border-slate-500 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1 tracking-wider font-medium" placeholder="Title name" onChange={changedValue} />
                <button className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-300 px-3 py-2 w-full rounded text-slate-100 tracking-widest font-bold" type="submit">
                    Change
                </button>
            </form>
        </div>
    )
}