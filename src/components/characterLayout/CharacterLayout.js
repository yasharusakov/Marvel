import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";

import './CharacterLayout.scss';

import setContent from "../../utils/setContent";

export default function CharacterLayout({id}) {

    const [character, setCharacter] = useState(null);
    const { getCharacter, setProcess, process } = useMarvelService();

    useEffect(() => {
        getCharacter(id)
            .then(onCharacterLoaded)
            .then(() => setProcess('confirmed'));
        // eslint-disable-next-line
    }, [])

    const onCharacterLoaded = (character) => {
        setCharacter(character);
    }

    return (
        <div className="character">
            {setContent(process, View, character)}
        </div>
    );
}

const View = ({data}) => {
    const {name, thumbnail, description, comics} = data;

    const items = comics.items.map(({name, resourceURI}, i) => {
        const id = resourceURI.slice(43)
        return <Link key={i} to={`/comics/${id}`} href={resourceURI} className="character__comics-name">{name}</Link>
    })

    return (
        <>
            <div className="character__base">
                <div className="character__picture">
                    <img src={thumbnail} alt={name} />
                </div>
                <div className="character__text">
                    <h1>{name}</h1>
                    {
                        description.length > 0 ? 
                        <div className="character__description">
                            {description}
                        </div> : 
                        <div className="character__description">
                            There is not description of this character
                        </div>
                    }
                </div>
            </div>
            {
                comics.available > 0 ?
                <div className="character__comics">
                    <h1>Comics</h1>
                    <div className="character__comics-list">
                        {items}
                    </div>
                </div> : null
            }
        </>
    );
}