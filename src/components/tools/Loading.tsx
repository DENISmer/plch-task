import style from '../../styles/PostList.module.scss'
import loading_image from '../../../public/cat_dance.gif'

export const Loading: React.FC = () => {
    return <div className={style.loadingWindow}>
        <img width={170} src={loading_image} alt="Loading" />
    </div>;
}