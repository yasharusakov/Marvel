import { useParams } from "react-router";

import CharacterLayout from "../characterLayout/CharacterLayout";
import ComicLayout from "../comicLayout/ComicLayout";
import CreatorLayout from "../creatorLayout/CreatorLayout";

export default function BaseLayout({name}) {
    const { id } = useParams();

    switch(name) {
        case 'characters':
            return <CharacterLayout id={id} />
        case 'comics':
            return <ComicLayout id={id} />
        case 'creators': 
            return <CreatorLayout id={id} />
        default:
            throw new Error('Error');
    }
    
}