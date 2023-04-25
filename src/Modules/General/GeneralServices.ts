//import { END_POINT_MasterData, END_POINT_SSO } from './EndPoints';
// import { EP_URL } from '../../Common/Endpoint';
import { loginMethod } from './../../Common/AxiosSetup';
// import { ILoginEntity } from './GeneralUtils';


export const CheckValidUserService = async (LoginEntity: any) => {
    return await loginMethod('https://localhost:7235/', 'Login/Login', LoginEntity);
}
