import { observer } from "mobx-react-lite";
import PostItem from "./PostItem";
import postStore from "../stores/PostStore";
import { useEffect } from "react";
import PL_S from '../styles/PostList.module.scss';
import PaginationBar from "./tools/Pagination";

const PostList: React.FC = observer(() => {
    const { posts, loading, currentPage, postsPerPage } = postStore;

    useEffect(() => {
        postStore.getPostsPage()
    }, [])

    useEffect(() => {
        postStore.getPostsPage()
    }, [currentPage, postsPerPage])


    const Loading: React.FC = () => {
        return <div className={PL_S.loadingWindow}>
            <img width={170} src='/cat_dance.gif' alt="Loading" />
        </div>;
    }


    return (
        <section className={PL_S.PostList}>
            <header>
                <h1>POST LIST</h1>
            </header>
            <PaginationBar />
            <div className={PL_S.ListContainer}>
                {!loading ? posts.map((item) => (
                    <PostItem key={item.id} {...item} />
                )) : <Loading />}
            </div>
            {!loading && posts.length > 0 && <PaginationBar />}
        </section>
    )
})

export default PostList;