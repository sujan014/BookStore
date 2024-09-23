import { useState } from "react"
import { ReviewType } from "../values"

const ItemButton = ({name}: {name: string}) => {
    return(
        <button className="item-button">
            {name}
        </button>
    )
}

const ReviewBox = ({review}: {review: ReviewType}) => {    
    return(
        <div className="review-box">
            <div className="review-name">
                {review.name}
            </div>
            <div className="review-body">
                {review.body}
            </div>
        </div>
    )
}
const Genre = ({genres} : {genres: string[]}) => {
    return(
        <div>
            <p>Genre:</p>
            {
                genres.map(genre => <ItemButton name={genre}/>)
            }
        </div>
    )
}

const Review = ({reviews}: {reviews: ReviewType[]}) => {
    //const [click, setClick] = useState(false);
    
    return(
        <div>
            <button className="accordion">
                Reviews            
            </button>
            {
                reviews.map(review => <ReviewBox review = {review} />)
            }
        </div>
    )
}
export {
    Genre,
    Review, 
    ItemButton
};