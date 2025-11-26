export interface Company{
    _id: string
    name: string
    description: string
    owner: string
}

export interface ApiResponse<T>{
 success: boolean;
 message: string ;
 data: T;
}