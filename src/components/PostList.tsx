import { observer } from "mobx-react-lite";
import PostItem from "./PostItem";
import postStore from "../stores/PostStore";
import { useEffect, useRef } from "react";
import style from '../styles/PostList.module.scss';
import PaginationBar from "./tools/Pagination";
import { Loading } from "./tools/Loading";
import Header from "./ui/Header";

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

    if (loading) {
        return (
        <section className={style.PostList}>
            <Header />
            <PaginationBar />
            <Loading />
        </section>);
    }

    if (!loading && posts.length === 0) {
        return (
            <section className={style.PostList}>
                <Header />
                <PaginationBar />
                <p>No posts available</p>
            </section>
        );
    }

    return (
        <section className={style.PostList}>
            <Header />
            <PaginationBar />
            <div className={style.ListContainer}>
                {posts.map((item) => (
                    <PostItem key={item.id} {...item} />
                ))}
            </div>
            <PaginationBar />
        </section>
    );
})

export default PostList;