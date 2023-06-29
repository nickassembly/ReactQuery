import { useQuery } from "@tanstack/react-query"
import { getPosts } from "./api/posts"

export default function PostsList1() {
    const postsQuery = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
        // cause to go stale after 1 second you can add staleTime property here
        //staleTime: 1000
        // refetchInterval: 1000 // cause a refetch every 1 second
    })

    // see fetch info (react query runs fetch whenever pages switch or even if you lose focus)
    postsQuery.fetchStatus === "fetching" // refetching the query
    postsQuery.fetchStatus === "idle" // already fetched


    if (postsQuery.status === "loading") return <h1>Loading...</h1>
    if (postsQuery.status === "error") {
        return <h1>{JSON.stringify(postsQuery.error)}</h1>
    }

    return (
        <div>
            <h1>Post List 1</h1>
            <ol>
                {postsQuery.data.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ol>
        </div>
    )
}
