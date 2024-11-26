import { observer } from "mobx-react-lite"
import postStore from "../../stores/PostStore"
import PL_S from '../../styles/PostList.module.scss'

const PaginationBar = observer(() => {
    const {postsPerPage, currentPage, posts} = postStore;

    const handleChangePage = (forward: boolean) => {
        if (forward) {
            postStore.setCurrentPage(currentPage + 1)
        } else {
            postStore.setCurrentPage(currentPage - 1)
        }
    }

    const ItemsPerPageSelect: React.FC = () => {
        return (
            <div>
                <select value={postsPerPage} onChange={(e) => postStore.setPostsPerPage(Number(e.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
        )
    }

    return (
        <div className={PL_S.pagination}>
            <button disabled={currentPage === 1} onClick={() => handleChangePage(false)}>←</button>
            {currentPage}{" "}<ItemsPerPageSelect />
            <button disabled={posts.length === 0} onClick={() => handleChangePage(true)}>→</button>
        </div>
    )
})

export default PaginationBar