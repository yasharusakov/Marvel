import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './CharList.scss';

export default function CharList() {

    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(230);
    const {getAllCharacters, process, setProcess} = useMarvelService();
    const [newItemLoading, setNewItemLoading] = useState(false);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    }    

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, []);

    const onCharListLoaded = (newItems) => {
        setCharList([...charList, ...newItems]);
        setOffset(offset => offset + 12);
        setNewItemLoading(false);
    }

    return (
        <div className="characters-list">
            <ul className="characters-list__container">
                <View data={charList} />
                {
                    process !== 'confirmed' ? <Spinner/> : null
                }
            </ul>
            <button 
                disabled={newItemLoading}
                style={process === 'confirmed' ? {visibility: 'visible'} : {visibility: 'hidden'}}
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
    const items = data.map(({name, thumbnail, id}) => {
        return (
            <li loading="lazy" key={id}>
                <Link to={`/characters/${id}`}>
                    <img src={thumbnail} alt={name} />
                    <div className="character-name">{name}</div>
                </Link>
            </li>
        );
    });

    return items;
}