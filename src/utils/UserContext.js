import {createContext,useState,useEffect,useMemo,useContext} from 'react'
import {CURRENTUSER} from '../api'


const UserContext = createContext({
    user:null,
    loading:true
})


/**
 * These function return the current user of the application,
 * in case of null value, the application will reload.
 * @param {Object} user - logged user stored in the app context
 * @param {Boolean} loading - have the user or not
 */

const useAppContext = () =>{
    const {user,loading} = useContext(UserContext)
    if(user===null){
        window.location.reload()
    }

    return {user,loading}
}

/**
 * Provide access to the logged user stored in the application context
 * 
 * @param {*} children - All application routes that need the User Context 
 */

const AppContextProvider = ({children}) =>{
    const [user,SetUser] = useState()
    const [loading,SetLoading] = useState(true)

    useEffect(()=>{
        async function GetCurrentUser(){
            const response = await CURRENTUSER()
            SetUser(response)
            if(user!==null)
                SetLoading(false)
        }

        GetCurrentUser()
    },[user])

    const value = useMemo(() => ({
        user,loading
      }), [user, loading])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider> 

}


export {UserContext,AppContextProvider,useAppContext}
