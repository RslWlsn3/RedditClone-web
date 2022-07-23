import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import Link from "next/link";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    }
  });
  return (
    <Layout>
      <Link href="/create-post">create post</Link>
      <br />
      {!data ? null : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
// export default withUrqlClient(createUrqlClient, { ssr: true})(Index);
