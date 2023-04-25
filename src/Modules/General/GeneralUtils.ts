
export interface ILoginEntity {
    EMail : string,
    Password : string
}

export const IStickyData =  { 
    ID: 0, 
    Type: 0, 
    Message:"", 
    Time:0, 
    ShowToast:false
}

export interface IStickyEntity {
    ID : number,
    Type : number,
    Message : string
    Time:number,
    ShowToast:boolean
}