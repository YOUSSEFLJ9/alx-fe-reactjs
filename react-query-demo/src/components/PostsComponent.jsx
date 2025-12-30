import {useQuery} from 'react-query';
import axios from 'axios';

const fetchPosts = async () =>
{
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return res.data;
};
export default function PostsComponent()
{
    const {data, isError, isLoading} = useQuery('posts', fetchPosts, {
        staleTime: 1 * 60 * 1000, // 1 minute
        cacheTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true,
        keepPreviousData: true,
    });
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>error fetching posts</div>;
    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {data.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}