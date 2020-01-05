export interface INewsArticle {
    status: Status;
    summary: string;
}

export interface Status {
    code: number;
    msg: string;
}