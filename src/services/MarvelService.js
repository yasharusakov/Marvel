import { useHttp } from "../hooks/http.hook"

const useMarvelService = () => {
    const { request, process, setProcess } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=d876698dfe27a6bbaab0951bb06ec845';
    const _offset = 230;

    const getAllCharacters = async (baseOffset = _offset) => {
        const response = await request(`${_apiBase}characters?limit=12&offset=${baseOffset}&${_apiKey}`);
        return response.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const response = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(response.data.results[0])
    }

    const getAllComics = async (baseOffset = _offset) => {
        const response = await request(`${_apiBase}comics?limit=12&offset=${baseOffset}&${_apiKey}`); 
        return response.data.results.map(_transformComics);
    }

    const getCreator = async (id) => {
        const creator = await request(`${_apiBase}creators/${id}?${_apiKey}`);
        const comics = await request(`${_apiBase}creators/${id}/comics?${_apiKey}`);
        const creatorData = await _transformCreator(creator.data.results[0]);
        const comicsData = await comics.data.results.map(_transformCreatorComics);
        return {...creatorData, comics: [...comicsData]};
    }

    const getComic = async (id) => {
        const response = await request(`${_apiBase}comics/${id}?${_apiKey}`); 
        return _transformComics(response.data.results[0]);
    }

    const getEvents = async (baseOffset = 0) => {
        const events = await request(`${_apiBase}events?limit=3&offset=${baseOffset}&${_apiKey}`);
        return events.data.results.map(_transformEvents);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            description: char.description,
            comics: char.comics
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id, 
            title: comics.title,
            description: comics.description,
            pageCount: comics.pageCount,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            creators: comics.creators.items.length > 0 ? comics.creators.items : null,
            price: comics.prices.reduce((prev, current) => prev + current.price, 0) 
        }
    }

    const _transformCreator = (creator) => {
        return {
            creatorFullName: creator.fullName 
        }
    }

    const _transformCreatorComics = (comics) => {
        return {
            title: comics.title,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            id: comics.id
        }
    }

    const getDataEvents = (data, type) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].type === type) {
                return data[i].url
            }
        }
    } 

    const _transformEvents = (event) => {
        return {
            id: event.id,
            title: event.title,
            description: event.description,
            thumbnail: event.thumbnail.path + '.' + event.thumbnail.extension,
            wiki: getDataEvents(event.urls, 'wiki'),
            detail: getDataEvents(event.urls, 'detail'),
        }
    }

    return {
        process, 
        setProcess,
        getAllCharacters,
        getAllComics,
        getCharacter,
        getComic,
        getCreator,
        getEvents
    }
}

export default useMarvelService;