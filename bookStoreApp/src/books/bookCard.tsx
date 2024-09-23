import { BookType } from "../values"
import { Genre, Review } from "./components";

const BookCard = (book: BookType) => {
    console.log(book);
    book.reviews.forEach(item => {
        console.log(`${item.name}: ${item.body}`);
    })
    return(
        <div className="card">
            <div className="card-row">
                <label className="card-label">Title:</label>
                <label className="card-data">
                    {book.title}
                </label>
            </div>
            <div className="card-row">
                <label className="card-label">Author:</label>
                <label className="card-data">
                    {book.author}
                </label>                
            </div>
            <div className="card-row">
            <label className="card-label">Ratings:</label>
                <label className="card-data">
                    {book.rating}
                </label>                
            </div>
            <Genre genres={book.genres}/>
            <Review reviews={book.reviews}/>
        </div>
    )
}

export {BookCard};