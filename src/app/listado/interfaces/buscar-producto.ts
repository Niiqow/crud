export interface Busqueda {
    ok:  boolean;
    msg: Msg;
}

export interface Msg {
    _id:       string;
    nombre:    string;
    categoria: string;
    precio:    number;
    createdAt: Date;
    updatedAt: Date;
}
