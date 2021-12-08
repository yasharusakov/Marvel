import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import setContent from '../../utils/setContent';

import './ComicLayout.scss';

export default function ComicLayout({id}) {

    const [comic, setComic] = useState({});
    const { getComic, process, setProcess } = useMarvelService();

    useEffect(() => {
        getComic(id)
            .then(onComicLoaded)
            .then(() => setProcess('confirmed'));
        // eslint-disable-next-line
    }, [])

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    return (
        <div className="comic">
            {setContent(process, View, comic)}
        </div>
    );
}

const View = ({data}) => {
    const {title, description, pageCount, thumbnail, price, creators} = data;

    // eslint-disable-next-line
    const filteredWriters = creators.filter((item) => {
        if (item.role === 'writer') return {...item};
    });


    const writers = filteredWriters.map(({name, resourceURI}, i) => {
        const id = resourceURI.slice(45);
        if (i === filteredWriters.length - 1) {
            return <Link key={id} to={`/creators/${id}`}>{name}.</Link>
        } else {
            return <Link key={id} to={`/creators/${id}`}>{name},</Link>
        }
    });


    return (
        <>
            <div className="comic__picture">
                <img src={thumbnail} alt={title} />
            </div>
            <div className="comic__base">
                <div className="comic__title">{title}</div>
                {
                    writers.length > 0 ? <div className="comic__writers">Writers: {writers}</div> : null
                }
                <div className="comic__description">
                    {
                        description ? description : 'There is not description of this comic'
                    }
                </div>
                <div className="comic__page-count">Page count: {pageCount}</div>
                <div className="comic__price">{price}$</div>
            </div>
        </>
    );
}