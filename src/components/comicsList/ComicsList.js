import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './ComicsList.scss';

export default function ComicsList() {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(230);
    const {getAllComics, process, setProcess} = useMarvelService();
    const [newItemLoading, setNewItemLoading] = useState(false);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'));
    }

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, []);

    const onComicsLoaded = (newItems) => {
        setComicsList([...comicsList, ...newItems]);
        setOffset(offset => offset + 12);
        setNewItemLoading(false);
    }

    return (
        <div className="comics-list">
            <ul className="comics-list__container">
                <View data={comicsList} />
                {
                    process !== 'confirmed' ? <Spinner/> : null
                }
            </ul>
            <button 
                disabled={newItemLoading}
                style={process === 'confirmed' ? {display: 'visible'} : {visibility: 'hidden'}}
                onClick={() => onRequest(offset)}
                className="load-more">LOAD MORE</button>
                {
                    newItemLoading ? 
                        <div style={{position: 'relative'}}>
                            <Spinner />
                        </div> : null
                }
        </div>
    );
}

const View = ({data}) => {
    const items = data.map(({title, thumbnail, id}) => {
        return (
            <li loading="lazy" key={id}>
               <Link to={`/comics/${id}`}>
                    <img src={thumbnail} alt={title} />
                    <div className="comic-name">{title}</div>
               </Link>
            </li>
        );
    });

    return items;
}