import { observer } from "mobx-react-lite";
import { Post } from "../types/types";
import card_style from '../styles/PostList.module.scss'
import { useNavigate } from "react-router";
import { api } from "../api/PostApi";
import postStore from "../stores/PostStore";
import defaultImage from '../../public/no_image.png';
import ImageWithPlaceholder from "./ui/ImageWithPlaceholder";

const PostItem: React.FC<Post> = observer(({ body, title, authorName, id }) => {
    const navigate = useNavigate()

    const handlePostClick = () => {
        postStore.setPost(id)
        navigate(`/posts/${id}`)
    }

    return (
        <section className={card_style.PostCardContainer}>
            <div onClick={() => handlePostClick()} className={card_style.PostCard}>
                <ImageWithPlaceholder
                    src={api.image}
                    fallback={defaultImage}
                    alt="image"
                    width={400}
                />
                <h2>{title}</h2>
                <h4>{authorName}</h4>
                <p>{body}</p>
            </div>
        </section>
    )
})

export default PostItem;