import { observer } from "mobx-react-lite";
import PostItem from "./PostItem";
import postStore from "../stores/PostStore";
import { useEffect, useRef } from "react";
import style from '../styles/PostList.module.scss';
import PaginationBar from "./tools/Pagination";
import { Loading } from "./tools/Loading";

const PostList: React.FC = observer(() => {
    const { posts, loading, currentPage, postsPerPage } = postStore;
    const isInitialRender = useRef(true);

    useEffect(() => { // remove unnecessary requests
        if (isInitialRender.current) {
            isInitialRender.current = false;
            postStore.getPostsPage();
        } else {
            postStore.getPostsPage();
        }
    }, [currentPage, postsPerPage]);

    return (
        <section className={style.PostList}>
            <header>
                <h1>POST LIST</h1>
            </header>
            <PaginationBar />
            <div className={style.ListContainer}>
                {!loading ? posts.map((item) => (
                    <PostItem key={item.id} {...item} />
                )) : <Loading />}
            </div>
            {!loading && posts.length > 0 && <PaginationBar />}
        </section>
    )
})

export default PostList;