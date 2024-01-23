
export interface Image {
    src: string,
    id: number
}

export interface ICardProps {
    state: boolean;
    image: Image;
    index: number;
    onClick: (index:number) => void;
}

export const sourceFront = "https://api.dicebear.com/7.x/fun-emoji/svg?seed="
export const backFace ="https://api.dicebear.com/7.x/shapes/svg?seed=Harley";

const Card = (props: ICardProps) => {
    const {state, image, index, onClick} = props;
    let src = state === false? backFace:image.src;
    return <img src ={src}  height="auto" width={150} alt={`image_${index}`} id={`image_${index}`} data-testid={image.id} onClick={() =>onClick(index)}/>;
}

export default Card;