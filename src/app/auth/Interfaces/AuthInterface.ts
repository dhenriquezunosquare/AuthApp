export interface AuthResponse{
    ok:boolean;
    uid?:string;
    token?:string;
    msg?:string;
    name?:string;
    email?:string;
    lastName?:string;
}

export interface Usuario{
    name:string;
    email:string;
    lastName:string;
    uid:string;
}