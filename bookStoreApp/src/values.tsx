const baseUrl: string = "http://localhost:3000";

interface ReviewType{
    name: string
    body: string,    
}
interface BookType {
    _id : string,
    title: string,
    author : string,
    rating: number,
    pages: number,
    genres : string[],
    reviews : ReviewType[]
}

interface BookViewModel{
    title: string,
    author : string,
    rating: number,
    pages: number,
    genres : string[],
    reviews : ReviewType[]
}
type CancelProps = {
    OnCancel: (event: React.MouseEvent<HTMLElement>, state: boolean) => void;
}

export {baseUrl};
export type {
    BookType,
    BookViewModel,
    ReviewType,
    CancelProps
};
