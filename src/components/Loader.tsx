import { FC } from 'react';
import { ClipLoader } from 'react-spinners';

interface LoaderProps {
    
}
 
const Loader: FC<LoaderProps> = () => {
    return (
        <ClipLoader size={25} color='#000' />
      );
}
 
export default Loader;