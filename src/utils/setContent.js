import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Spinner from '../components/spinner/Spinner';

export default function setContent(process, Component, data){
    switch(process) {
        case 'waiting':
            return <Spinner/>
        case 'loading':
            return <Spinner/>
        case 'error': 
            return <ErrorMessage/>
        case 'confirmed':
            return <Component data={data}/>
        default:
            throw new Error('Error');
    }
}