import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { useState } from "react";
import PostsList1 from "./PostList1"
import PostsList2 from "./PostList2"

import Post from "./Post"

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" }
]

export default function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>Posts List 1</button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>Posts List 2</button>
      <button onClick={() => setCurrentPage(<Post id={1} />)}>First Post</button>
      <br />
      {currentPage}
    </div>
  )

}

// query key examples
// /posts -> ["posts"]
// /posts/1 -> ["posts", post.id]
// /posts?authorId=1 -> ["posts", {authorId: 1}]
// /posts/2/comments -> ["posts", post.id, "comments"   ]

// function App() {
//   // const queryClient = useQueryClient();
//   const postsQuery = useQuery({
//     queryKey: ["posts"],
//     queryFn: (obj) => wait(1000).then(() => {
//       console.log(obj)
//       return [...POSTS]
//     }),
//   })

//   // mutations
//   // const newPostMutation = useMutation({
//   //   mutationFn: title => {
//   //     return wait(1000)
//   //       .then(() => POSTS.push({ id: crypto.randomUUID(), title })
//   //       )
//   //   },
//   //   onSuccess: () => {
//   //     queryClient.invalidateQueries("posts");
//   //   }
//   // })

//   postsQuery.status === ""

//   if (postsQuery.isLoading) return <h1>Loading...</h1>
//   if (postsQuery.isError) {
//     return <pre>{JSON.stringify(postsQuery.error)}</pre>
//   }

//   return <div>
//     {postsQuery.data.map(post => (
//       <div key={post.id}>{post.title}</div>
//     ))}
//     {/* <button disabled={newPostMutation.isLoading} onClick={() => newPostMutation.mutate("new post")}>
//       Add New
//     </button> */}
//   </div>
// }

// function wait(duration) {
//   return new Promise((resolve) => setTimeout(resolve, duration));
// }

// export default App
