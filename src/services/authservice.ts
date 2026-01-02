import axios from 'axios';
import { environment } from "../environment/environment";
import AsyncStorage from '@react-native-async-storage/async-storage';


export class AuthService {
    private static instance: AuthService;

    private readonly registerUrl=`${environment.api}/${environment.authService}/register`;
    private readonly loginUrl = `${environment.api}/${environment.authService}/login`

    public static getInstance(): AuthService {
        if(!AuthService.instance){
            AuthService.instance = new AuthService();
        }

        return AuthService.instance;
    }

    public async register(payload:any): Promise<any>{
        try{
            const res = await axios.post(this.registerUrl, payload);
            return res.data;
        }catch(err){
            throw err;
        }
    }

    public async login(payload:any):Promise<any>{
        try{
            const res = await axios.post(this.loginUrl, payload);
            return res.data;
        }catch(err){
            throw err;
        }
    }

    async logout() {
        await AsyncStorage.removeItem("access_token");
    }

    async isAuthenticated(): Promise<boolean> {
        const token = await AsyncStorage.getItem("access_token");
        return !!token;
    }

}   