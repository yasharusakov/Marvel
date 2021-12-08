import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';

import { Link } from 'react-router-dom';

import setContent from '../../utils/setContent';

import './CreatorLayout.scss';

export default function CreatorLayout({id}) {

    const [creator, setCheator] = useState({});
    const { getCreator, setProcess, process } = useMarvelService();

    useEffect(() => {
        getCreator(id)
            .then(onCheatorLoaded)
            .then(() => setProcess('confirmed'));
        // eslint-disable-next-line
    }, [])

    const onCheatorLoaded = (creator) => {
        setCheator(creator);
    }

    return (
        <div className="creator">
            <div className="creator__name">{creator.creatorFullName}</div>
            <div className="comics-list">
                <ul className="comics-list__container" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(275px, 300px))'}}>
                    {setContent(process, View, creator.comics)}
                </ul>
            </div>
        </div>
    );
}


const View = ({data}) => {
    const items = data.map(({title, thumbnail, id}) => {
        return (
            <li key={id}>
               <Link to={`/comics/${id}`}>
                    <img src={thumbnail} alt={title} />
                    <div className="comic-name">{title}</div>
               </Link>
            </li>
        );
    });

    return items;
}