import { useQueries } from "react-query";
import axios from "axios";

//"useQuery", "error", "fetchPosts"
//cacheTime", "staleTime", "refetchOnWindowFocus", "keepPreviousData
const fetchPosts = async (postId) => {
    const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return data;
    };

export const PostsComponent = ({ postIds }) => {
    const queries = useQueries(
        postIds.map((postId) => {
        return {
            queryKey: ['post', postId],
            queryFn: () => fetchPosts(postId),
        };
        })
    );

    if (queries.some((query) => query.isLoading)) {
        return <div>Loading...</div>;
    }

    if (queries.some((query) => query.isError)) {
        return <div>Error fetching posts</div>;
    }

    return (
        <div>
        {queries.map((query, index) => (
            <div key={postIds[index]}>
            <h3>{query.data.title}</h3>
            <p>{query.data.body}</p>
            </div>
        ))}
        </div>
    );
}