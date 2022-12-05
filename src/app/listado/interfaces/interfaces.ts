export interface Busqueda {
    status: number;
    body:   Body[];
}

export interface Body {
    id:        string;
    nombre:    string;
    categoria: string;
    precio:    number;
}

