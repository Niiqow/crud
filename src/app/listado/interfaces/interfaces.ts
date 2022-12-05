export interface Info {
    totalItems:  number;
    products:    Product[];
    totalPages:  number;
    currentPage: number;
}

export interface Product {
    _id:       string;
    nombre:    string;
    categoria: string;
    precio:    number;
    link?:    string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Busqueda {
    kind:              string;
    url:               URL;
    queries:           Queries;
    context:           Context;
    searchInformation: SearchInformation;
    items:             Item[];
}

export interface Context {
    title: string;
}

export interface Item {
    kind:        string;
    title:       string;
    htmlTitle:   string;
    link:        string;
    displayLink: string;
    snippet:     string;
    htmlSnippet: string;
    mime:        string;
    fileFormat:  string;
    image:       Image;
}

export interface Image {
    contextLink:     string;
    height:          number;
    width:           number;
    byteSize:        number;
    thumbnailLink:   string;
    thumbnailHeight: number;
    thumbnailWidth:  number;
}

export interface Queries {
    request:  NextPage[];
    nextPage: NextPage[];
}

export interface NextPage {
    title:          string;
    totalResults:   string;
    searchTerms:    string;
    count:          number;
    startIndex:     number;
    inputEncoding:  string;
    outputEncoding: string;
    safe:           string;
    cx:             string;
    searchType:     string;
}

export interface SearchInformation {
    searchTime:            number;
    formattedSearchTime:   string;
    totalResults:          string;
    formattedTotalResults: string;
}

export interface URL {
    type:     string;
    template: string;
}
