import Axios from "axios";

export const common = (BaseUrl: string, url: string, EntityObject?: any) => {
    //debugger
    return new Promise(async (resolve, reject) => {
        //debugger
        try {
            await Axios({
                method: 'post',
                url: `${BaseUrl}${url}`,
                data: EntityObject
            }).then((res: any) => {
                resolve(res);
            }).catch((error: any) => {
                resolve(error);
            });
        } catch (error) {
            resolve("error");
        }
    });
}
export const PostMethod = (BaseUrl: string, url: string, EntityObject?: any, setContext?:any) => {
    SpinShow(true, setContext)
    return new Promise((resolve, reject) => {
        try {
            Axios({
                method: 'post',
                url: `${BaseUrl}${url}`,
                data: EntityObject

            }).then((res: any) => {
                if(res.data.result === "-1"){
                    console.error(res.data.warnings[0])
                }
                else if(res.data.result === "-2" || res.data.result === "-3"){
                    console.warn(res.data.warnings[0])
                }
                SpinShow(false, setContext);
                resolve(res);
            }).catch((error: any) => {
               debugger
                SpinShow(false, setContext)
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    window.localStorage.clear();
                    window.location.href = "/";
                }
                else if (error.response.status === 500) {
                }
                resolve("error");
            });
        } catch (error) {
            reject(error);
        }
    });
}

export const loginMethod = (BaseUrl: string, url: string, EntityObject?: any) => {
    return new Promise((resolve, reject) => {
        try {
            Axios({
                method: 'post',
                url: `${BaseUrl}${url}`,
                headers: {
                    "content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "X-Requested-With",
                    cors: "no-cors",
                },
                data: EntityObject
            }).then((res: any) => {
                resolve(res);
            }).catch((error: any) => {
                resolve(error);
            });
        } catch (error) {
            resolve("error");
        }
    });
}

const SpinShow = (bool:Boolean, setContext:any) => {
    if(bool === true) {
        setContext((prevState:any) => ({
            ...prevState,
            Spin:true
        }));
    }
    else {
        setContext((prevState:any) => ({
            ...prevState,
            Spin:false
        }));
    }
}