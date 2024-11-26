import { observer } from "mobx-react-lite";
import { Post } from "../types/types";
import PC_S from '../styles/PostList.module.scss'
import { useNavigate } from "react-router";
import { api } from "../api/PostApi";
import postStore from "../stores/PostStore";
import { useState } from "react";

const PostItem: React.FC<Post> = observer(({ body, title, authorName, id }) => {
    const navigate = useNavigate()
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handlePostClick = () => {
        postStore.setPost(id)
        navigate(`/posts/${id}`)
    }

    return (
        <section className={PC_S.PostCardContainer}>
            <div onClick={() => handlePostClick()} className={PC_S.PostCard}>
                <img onLoad={handleImageLoad} width={400} src={api.image} alt='image' />
                {imageLoading && <img width={400} src='/no_image.png' alt='image' />}
                <h2>{title}</h2>
                <h4>{authorName}</h4>
                <p>{body}</p>
            </div>
        </section>
    )
})

export default PostItem;