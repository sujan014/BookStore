import { MouseEvent, useRef, useState } from "react";
import { baseUrl, BookType, BookViewModel, CancelProps, ReviewType } from "../values";
import { ItemButton } from "./components";
import axios from "axios";

const AddNewBlock = () => {
    const [add, setAdd] = useState(false);

    const handleAdd = (event: React.MouseEvent<HTMLElement>, state: boolean) => {
        event.preventDefault();
        setAdd(state);
    }
    return(
        <div className="add-new">
            <button 
                className="button-style1"
                onClick={(event) => {
                    handleAdd(event, true);
                    // event.preventDefault();
                    // handleAdd(true)
                    }
                }
            >
                Add New Book
            </button>
            {
                add ? 
                <AddBook OnCancel={handleAdd}/>: 
                null
            }
        </div>
    )
}

const AddBook = (props: CancelProps) => {
    const {OnCancel} = props;    
    const bookRef = useRef<HTMLFormElement>(null);
    
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState(0);
    const [pages, setPages] = useState(0);
    const [newGenre, setNewGenre] = useState('');   // temporary value selected
    const [genres, setGenres] = useState<string[]>([])
    const [newReview, setNewReview] = useState<ReviewType>({
        name: "",
        body: ""
    });
    const [reviews, setReviews] = useState<ReviewType[]>([]);

    const resetForm = () => {
        setTitle("");
        setAuthor("");
        setRating(0);
        setPages(0);
        setNewGenre("");
        setGenres([]);
        setNewReview({
            ...newReview, 
            name: "", 
            body: ""
        });
        setReviews([]);
    }
    const selectGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setNewGenre(event.target.value);
        setGenres([...genres, event.target.value]);
    }
    const handleReviewName = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNewReview({...newReview, name: event.target.value});
    }
    const handleReviewBody = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNewReview({...newReview, body: event.target.value});
    }

    const handleNewBook = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setReviews([...reviews, newReview]);
        let newBook: BookViewModel = {
            title: title,
            author: author,
            rating: rating,
            pages: pages,
            genres: genres,
            reviews: [...reviews, newReview]
        }
        try{
            var postResponse = await axios.post(
                `${baseUrl}/books`,
                newBook,            
            );
            if (postResponse.status === 200){
                resetForm();
                alert('Book added successfully');
            } else{
                alert('Book was not added.')
            }
            console.log(postResponse);
        }
        catch(error){
            alert('Error in adding book.')
        }
    }    
    return(
        <div className="form-div">
            <form onSubmit={handleNewBook} >
                <div className="form-row">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        className="form-input"
                        type='text'
                        name='title'
                        value={title}
                        placeholder="Enter book title"
                        onChange = {event => setTitle(event.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="author" className="form-label">
                        Author
                    </label>
                    <input
                        className="form-input"
                        type='text'
                        name='author'
                        value={author}
                        placeholder="Enter book author"
                        onChange = {event => setAuthor(event.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="rating" className="form-label">
                        Ratings
                        </label>
                    <input
                        className="form-input"
                        type='number'
                        name='rating'
                        value={rating}
                        placeholder="0"
                        onChange = {event => setRating(parseInt(event.target.value))}
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="pages" className="form-label">
                        Pages
                    </label>
                    <input
                         className="form-input"
                        type='number'
                        name='pages'
                        value={pages}
                        placeholder="0"
                        onChange={event => setPages(parseInt(event.target.value))}
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="genre" className="form-label">
                        Genre
                    </label>
                    <select
                        className="form-select"
                        value={newGenre}
                        onChange={selectGenre}
                        name="genre"
                    >
                        <option value='fantasy'>Fantasy</option>
                        <option value='sci-fi'>Sci-fi</option>
                        <option value='dystopian'>Dystopian</option>
                        <option value='magic'>Magic</option>
                        <option value='drama'>drama</option>
                        <option value='action'>action</option>
                    </select>                    
                </div>
                <p>
                    {genres.map(genre => <ItemButton name={genre} /> )}
                </p>
                <label className="form-center-label">Add Review</label>
                <div className="form-row">                                        
                    <label htmlFor="reviewName" className="form-label">Name</label>
                    <input
                        className="form-input"
                        type='text'
                        name='reviewName'
                        value={newReview.name}
                        placeholder="Your name"
                        onChange={handleReviewName}
                        //onChange={event => setNewReview({...newReview, name: event.target.value})}
                    />                    
                </div>
                <div className="form-row">                    
                    <label htmlFor="reviewBody" className="form-label">Body</label>
                    <input
                        className="form-input"
                        type='text'
                        name='reviewBody'
                        value={newReview.body}
                        placeholder="Post your reviews here"
                        onChange={handleReviewBody}
                        //onChange={event => setNewReview({...newReview, body: event.target.value})}
                    />                    
                </div>
                <div className="form-button-panel">
                    <button 
                        className="button-cancel"
                        onClick={
                            (event) => OnCancel(event, false)
                        }
                    >
                        Cancel
                    </button>
                    <button 
                        className="button-submit"
                        type="submit"
                    >
                        Save
                    </button>
                </div>
            </form>            
        </div>
    )
}
export {AddNewBlock};