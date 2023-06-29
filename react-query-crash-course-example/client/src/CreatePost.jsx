import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { createPost } from "./api/posts"
import Post from "./Post"

export function CreatePost({ setCurrentPage }) {
    const titleRef = useRef()
    const bodyRef = useRef()
    const queryClient = useQueryClient()
    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: data => {
            // manually update the cache with setQueryData
            queryClient.setQueryData(["posts", data.id], data) // brand new post with this query key and data

            // you want to invalidate the query any time you are mutating the data
            queryClient.invalidateQueries(["posts"], { exact: true }) // invalidates every array starting with "posts" using exact: true only invalidates exact query
            setCurrentPage(<Post id={data.id} />)
        },
        // on Mutate runs BEFORE mutationFn
        // onMutate: variables => {
        //     return { hi: "Bye" }
        // }
    })

    // async function
    // createPostMutation.mutateAsync().then(() => {
    //     // do something when you mutate
    // })

    // mutation is waiting to happen
    //createPostMutation.status === "idle" 

    function handleSubmit(e) {
        e.preventDefault()
        createPostMutation.mutate({
            title: titleRef.current.value,
            body: bodyRef.current.value,
        })
    }

    return (
        <div>
            {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" ref={titleRef} />
                </div>
                <div>
                    <label htmlFor="body">Body</label>
                    <input id="body" ref={bodyRef} />
                </div>
                <button disabled={createPostMutation.isLoading}>
                    {createPostMutation.isLoading ? "Loading..." : "Create"}
                </button>
            </form>
        </div>
    )
}