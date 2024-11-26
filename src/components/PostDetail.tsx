import { observer } from "mobx-react-lite";
import postStore from "../stores/PostStore";
import { api } from "../api/PostApi";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import PD_S from '../styles/PostDetail.module.scss';
import image from '../../public/cat_dance.gif';
import default_image from '../../public/no_image.png';

const PostPage: React.FC = observer(() => {
    const { selectedPost, loading } = postStore;
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        postStore.setPost(Number(id))
    }, [id])

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleBack = () => {
        navigate('/')
    }

    const Loading: React.FC = () => {
        return <div>
            <img width={170} src={image} alt="Loading" />
        </div>;
    }

    return (
        <section className={PD_S.Container}>
            <div><button onClick={() => handleBack()}>←</button></div>
            {selectedPost && !loading ?
                (<div className={PD_S.PostContainer}>
                    <div> 
                        <img onLoad={handleImageLoad} width={500} src={api.image} />
                        {imageLoading && <img width={500} src={default_image} />}
                    </div>
                    <div className={PD_S.ContentContainer}>
                        <h2>{selectedPost.title}</h2>
                        <h4>{selectedPost.authorName}</h4>
                        <p>{selectedPost.body}</p>
                    </div>
                </div>) : <Loading />}
        </section>
    )
})

export default PostPage;