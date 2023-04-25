export interface IGetFoldersDataModel {
    UserID : number
}

export interface IGetNotesDataModel {
    UserID : number
    FolderID : number
}

export const IDeleteData: IDeleteDataModel = {
    NotesID: 0,
    UserID: 0,
    DeleteConfirmationShow: false,
    DeleteMessage: 'Are you sure you want to delete Notes',
    DeleteTitle: ''
}
export interface IDeleteDataModel {
    NotesID: number,
    UserID: number,
    DeleteConfirmationShow: boolean,
    DeleteMessage: string
    DeleteTitle: string
}

export interface IUpsertNotesModel {
    NotesID: number
    NoteTitle: string
    NoteText: string
    FolderID: number
    UserID: number
    ThemeID: number
}

export interface ITempNotesModel {
    BGColor: string
    Date: string
    FolderID: number
    LengthNoteText: number
    NoteText: string
    NoteTitle : string
    NotesID: number
    TextColor: string
    ThemeID: number
    UserID: number
}

export const ITempNotes : ITempNotesModel = {
    BGColor: '',
    Date: '',
    FolderID: 0,
    LengthNoteText: 0,
    NoteText: '',
    NoteTitle : '',
    NotesID: 0,
    TextColor: '',
    ThemeID: 0,
    UserID: 0
}

export interface IGetFoldersModel {
    FolderID : number
    FolderName	 : string
    UserID	:number
    CreatedOn	:string
    IsActive:number
}