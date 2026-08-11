import { redirect } from '@tanstack/react-router'
import { getCurrentUser } from '../api/user_api';
import {login} from '../store/slice/authSlice.js'

export const checkAuth=({context})=>{
try{
    const {queryClient,store} = context;
    const user = await queryClient.ensureQueryData({
        querKey:["currentUser"],
        queryFn: getCurrentUser,
        retry:false
    });
    store.dispatch(login(user));
    const {isAuthenticated} = store.getState().auth
    if(!isAuthenticated) return false;
    return true
} catch (error){
        redirect({to:"/"})
}
}