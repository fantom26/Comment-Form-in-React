import Form from "./components/Form";
import CommentsList from './components/CommentsList'
import axios from 'axios';
import {useEffect, useState} from "react";

const App = () => {
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [total, setTotal] = useState(null);
    const [per_page, setPer_Page] = useState(null);
    const [current_page, setCurrent_Page] = useState(null);
    const [clickNum, setClickNum] = useState(0);
    const [last_page, setLast_Page] = useState(null);


    useEffect(() => {
        const loadComments = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://jordan.ashton.fashion/api/goods/30/comments?page=${page}`);
                setComments((comments) => [...comments, ...response.data.data]);
                setLast_Page(response.data.last_page);
                setErrorMsg('');
            } catch (error) {
                setErrorMsg('Error while loading data. Try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        loadComments();
    }, [page]);

    const loadMore = () => {
        setPage((page) => page + 1);
        setClickNum((click) => clickNum + 1)
    };

    if (clickNum === last_page) {
        const loadMoreBtn = document.querySelector('#btn')
        loadMoreBtn.classList.add('d-none');
    }

    // Pagination

    function componentDidMount() {
        makeHttpRequestWithPage(1);
    }

    const makeHttpRequestWithPage = async pageNumber => {
        let response = await fetch(`https://jordan.ashton.fashion/api/goods/30/comments?page=${pageNumber}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        setTotal(data.total);
        setPer_Page(data.per_page);
        setCurrent_Page(data.current_page);

    }

    const pageNumbers = [];
    let renderPageNumbers;
    if (total !== null && per_page !== null && current_page !== null) {
        for (let i = 1; i <= Math.ceil(total / per_page); i++) {
            pageNumbers.push(i);
        }

        renderPageNumbers = pageNumbers.map(number => {
            return (
                <span key={number} className='p-1 text-white bg-dark' onClick={() => makeHttpRequestWithPage(number)}>{number}</span>
            );
        });
    }

    return (
        <div className='bg-secondary'>
            <Form/>
            <CommentsList comments={comments}/>
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <div className="d-flex justify-content-center mb-3">
                <button onClick={loadMore} className="btn btn-info text-white" id="btn">
                    {isLoading ? 'Loading...' : 'Load More'}
                </button>
            </div>
            <span className='d-flex justify-content-center text-white h4' onClick={() => makeHttpRequestWithPage(1)}>Pagination</span>
            <div className='d-flex justify-content-center'>
                {renderPageNumbers}
            </div>
        </div>
    )
};

export default App;