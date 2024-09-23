import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, BookType } from "../values";
import { BookCard } from "./bookCard";

const Books = () => {    
    const [page, setPage] = useState(0);
    const [books, setBooks] = useState<BookType[]>([]);

    const getBooks = async(page: number) => {
        try{
            var response = await axios.get(`${baseUrl}/books?p=${page}`);
            console.log(response.data);
            if (response.status === 200){
                setBooks(response.data)
            }
        } catch(e){
            console.log(e);
        }
    }
    useEffect(() => {
        getBooks(page);
    }, [page])
    const pageUp = () => {
        setPage(page => page + 1)
    }
    const pageDown = () => {
        if (page > 0){
            setPage(page => page - 1)
        }
    }
    return(
        <section>
            <div>
                {
                    books.map((book) => {
                        return(
                            <BookCard key={book._id} {...book} />
                        )
                    })
                }
            </div>
            <div className='pagination-block'>
                <button 
                    className="page-button"
                    onClick={pageDown}
                >
                    &lt;
                </button>
                <label className="page-label">
                    {page+1}
                </label>
                <button 
                    className="page-button"
                    onClick={pageUp}
                >
                    &gt;
                </button>
            </div>
        </section>
    )
}

export default Books;

