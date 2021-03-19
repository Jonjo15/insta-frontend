import { useEffect, useContext, useReducer, createContext} from "react"
import authReducer from "./AuthReducer"
import { ACCEPT_REQUEST, DECLINE_REQUEST ,CLEAR_ERRORS, LOG_OUT,UNFOLLOW, SET_ERRORS, SET_USER} from "./types"
import axios from "axios"
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export const initialState = {
    authenticated: false,
    loading: true,
    currentUser: null, 
    token: localStorage.getItem("token"), 
    error: null
};

export function AuthProvider({children}) {
    const [state, dispatch] = useReducer(authReducer, initialState)
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

    useEffect(() => {
        
        axios.get("https://vast-island-68988.herokuapp.com/users/me").then(res => {
            const user = {user: res.data.user[0]}
            dispatch({type: SET_USER, payload: user})
        }).catch(error => {
            dispatch({type: SET_ERRORS, payload: {error: state.authenticated ? "Failed to get your user data" : null}})
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const register = async (data) => {
        try {
            const res = await axios.post("https://vast-island-68988.herokuapp.com/auth/register", data)
            dispatch({type: SET_USER, payload: res.data})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to register"}})
            console.log(error)
        }
    }
    
    const login = async (data) => {
        try {
            const res = await axios.post("https://vast-island-68988.herokuapp.com/auth/login", data)
            dispatch({type: SET_USER, payload: res.data})
        }
        catch(err) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to log in"}})
            console.log(err)
        }
    }
    const logout = () => {
        dispatch({type: LOG_OUT})
    }
    const googleSignIn = async(data) => {
        try {
            const res = await axios.post("https://vast-island-68988.herokuapp.com/auth/google", data)
            dispatch({type: SET_USER, payload: res.data})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to sign in with google"}})
        }
    }
    const clearErrors = () => {
        dispatch({type: CLEAR_ERRORS})
    }
    const acceptRequest = async(id) => {
        try {
            await axios.post("https://vast-island-68988.herokuapp.com/users/"+ id + "/accept")
            dispatch({type: ACCEPT_REQUEST, payload: id})
        }
        catch(error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to accept request"}})
        }
    }
    const rejectRequest = async(id) => {
        try {
            await axios.post("https://vast-island-68988.herokuapp.com/users/" + id + "/reject")
            dispatch({type: DECLINE_REQUEST, payload: id})
        }catch(err) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to reject request"}})
        }
    }
    
    
    const unfollowFromFeed = (id) => {
        console.log("im here from auth context")
        dispatch({type: UNFOLLOW, payload: id})
    }

    const value = {
      state,
      dispatch, 
      register, 
      login,
      logout, 
      clearErrors,
      googleSignIn,
      acceptRequest,
      rejectRequest,
      unfollowFromFeed
    }
      return (
          <AuthContext.Provider value={value}>
              {!state.loading && children}
          </AuthContext.Provider>
      )
  }