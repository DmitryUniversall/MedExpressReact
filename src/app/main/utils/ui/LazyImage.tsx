import { FC, useState } from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";

interface LazyImageProps {
    src: string;
    alt?: string;
    className?: string;
    skeletonProps?: SkeletonProps;
}

const LazyImage: FC<LazyImageProps> = ({ src, alt, className, skeletonProps }) => {
    const [ isLoaded, setIsLoaded ] = useState(false);

    return (
        <>
            { !isLoaded && <Skeleton { ...skeletonProps } /> }
            <img
                src={ src }
                alt={ alt }
                className={ `${ className } ${ !isLoaded ? "d-none" : "" }` }
                onLoad={ () => setIsLoaded(true) }
            />
        </>
    );
};

export default LazyImage;