import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './AppEvents.scss';

export default function AppEvents() {

    const [events, setEvents] = useState([]);
    const [offset, setOffset] = useState(0);
    const {getEvents, process, setProcess} = useMarvelService();
    const [newItemLoading, setNewItemLoading] = useState(false);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getEvents(offset)
            .then(onEventsLoaded)
            .then(() => setProcess('confirmed'))
    }

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, []);

    const onEventsLoaded = (newItems) => {
        setEvents([...events, ...newItems]);
        setOffset(offset => offset + 3);
        setNewItemLoading(false);
    }

    return (
        <div className="events">
            <div className="events__container">
                <div className="events__items">
                    {
                        process !== 'confirmed' ? <Spinner/> : null
                    }
                    <View data={events} />
                </div>
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
        </div>
    )
}

const View = ({data}) => {

    const items = data.map(({id, title, description, thumbnail, wiki, detail}) => {
        return (
            <div key={id} className="event-item">
                <div className="event-picture">
                    <img src={thumbnail} alt={title} />
                    <div className="event-links">
                        {
                            wiki ? <a rel="noreferrer" target="_blank" href={wiki} className="event-wiki" alt={wiki}>WIKI</a> : null
                        }
                        {
                            detail ? <a rel="noreferrer" target="_blank" href={detail} className="event-detail" alt={detail}>DETAIL</a> : null
                        }
                    </div>
                </div>
                <div className="event-base">
                    <div className="event-title">{title}</div>
                    <div className="event-description">{description}</div>
                </div>
            </div>
        )
    })

    return items;
}