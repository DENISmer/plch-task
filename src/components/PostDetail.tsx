import { observer } from "mobx-react-lite";
import postStore from "../stores/PostStore";
import { api } from "../api/PostApi";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import post_styles from '../styles/PostDetail.module.scss';
import defaultImage from '../../public/no_image.png';
import { Loading } from "./tools/Loading";
import ImageWithPlaceholder from "./ui/ImageWithPlaceholder";

const PostPage: React.FC = observer(() => {
    const { selectedPost, loading } = postStore;
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        postStore.setPost(Number(id))
    }, [id])


    const handleBack = () => {
        navigate('/')
    }

    if (loading) {
        return <section className={post_styles.Container}>
            <div>
                <button onClick={handleBack}>←</button>
            </div>
            <Loading />
        </section>;
    }

    if (!selectedPost) {
        return (
            <section className={post_styles.Container}>
                <div>
                    <button onClick={handleBack}>←</button>
                </div>
                <p>No post selected.</p>
            </section>
        );
    }

    return (
        <section className={post_styles.Container}>
            <div>
                <button onClick={handleBack}>←</button>
            </div>
            <div className={post_styles.PostContainer}>
                <div>
                    <ImageWithPlaceholder
                        src={api.image}
                        fallback={defaultImage}
                        alt="image"
                        width={400}
                    />
                </div>
                <div className={post_styles.ContentContainer}>
                    <h2>{selectedPost.title}</h2>
                    <h4>{selectedPost.authorName}</h4>
                    <p>{selectedPost.body}</p>
                </div>
            </div>
        </section>
    );
})

export default PostPage;