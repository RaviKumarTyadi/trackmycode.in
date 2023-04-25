// import { EP_URL } from '../../Common/Endpoint';
import { loginMethod } from './../../Common/AxiosSetup';
import { IGetFoldersDataModel, IGetNotesDataModel, IUpsertNotesModel } from './NotesUtils';

export const GetFoldersDataService = async (GetFoldersDataModel: IGetFoldersDataModel) => {
    return await loginMethod('https://localhost:7235/', 'Notes/GetFolders', GetFoldersDataModel);
}

export const GetNotesDataService = async (GetNotesDataModel: IGetNotesDataModel) => {
    return await loginMethod('https://localhost:7235/', 'Notes/GetNotes', GetNotesDataModel);
}

export const UpsertNotesDataService = async (UpsertNotesModel: IUpsertNotesModel) => {
    return await loginMethod('https://localhost:7235/', 'Notes/UpsertNotes', UpsertNotesModel);
}

export const GetThemesDataService = async (GetNotesDataModel: any) => {
    return await loginMethod('https://localhost:7235/', 'Notes/GetThemes', GetNotesDataModel);
}

export const DeleteNotesService = async (GetNotesDataModel: any) => {
    return await loginMethod('https://localhost:7235/', 'Notes/DeleteNotes', GetNotesDataModel);
}
