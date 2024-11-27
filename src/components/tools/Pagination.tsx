import { observer } from "mobx-react-lite"
import postStore from "../../stores/PostStore"
import styles from '../../styles/PostList.module.scss'

const PaginationBar = observer(() => {
    const {currentPage, posts, totalPagesCount ,currentArrayOfPages} = postStore;

    const handleChangePage = (forward: boolean | number) => {
        if (typeof forward == 'number') {
            postStore.setCurrentPage(forward)
        } else {
            if (forward) {
                postStore.setCurrentPage(currentPage + 1)
            } else {
                postStore.setCurrentPage(currentPage - 1)
            }
        }
    }

    const GenerateButtons = () => {
        console.warn("BBB: ",currentArrayOfPages)
        return (
          <div style={{display: 'flex', columnGap: '5px'}}>
            {currentArrayOfPages && currentArrayOfPages.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handleChangePage(pageNumber)}
                style={pageNumber === currentPage ? { border: '2px solid black', backgroundColor: '#002144' } : {}}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        );
      };
      

    return (
        <div className={styles.pagination}>
            {/* <div>{totalPagesCount}</div> */}
            <button disabled={currentPage === 1 || posts.length === 0} onClick={() => handleChangePage(false)}>←</button>
            <GenerateButtons />
            <button disabled={posts.length === 0 || currentPage === totalPagesCount} onClick={() => handleChangePage(true)}>→</button>
            {/* <ItemsPerPageSelect /> */}
        </div>
    )
})

export default PaginationBar