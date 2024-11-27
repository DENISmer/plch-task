import { observer } from "mobx-react-lite";
import { Post } from "../types/types";
import card_style from '../styles/PostList.module.scss'
import { useNavigate } from "react-router";
import { api } from "../api/PostApi";
import postStore from "../stores/PostStore";
import { useState } from "react";
import defaultImage from '../../public/no_image.png';

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
        <section className={card_style.PostCardContainer}>
            <div onClick={() => handlePostClick()} className={card_style.PostCard}>
                <img onLoad={handleImageLoad} width={400} src={api.image} alt='image' />
                {imageLoading && <img width={400} src={defaultImage} alt='image' />}
                <h2>{title}</h2>
                <h4>{authorName}</h4>
                <p>{body}</p>
            </div>
        </section>
    )
})

export default PostItem;