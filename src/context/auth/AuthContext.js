import { useEffect, useContext, useReducer, createContext} from "react"
import authReducer from "./AuthReducer"
import { ACCEPT_REQUEST, DECLINE_REQUEST,UPDATE_PROFILE_PIC, UPDATE_BIO,CLEAR_ERRORS, LOG_OUT, SET_ERRORS, SET_USER} from "./types"
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
        //TODO: TEST THIS OUT A BIT
        axios.get("http://localhost:5000/users/me").then(res => {
            console.log(res.data)
            const user = {user: res.data.user[0]}
            dispatch({type: SET_USER, payload: user})
        }).catch(error => {
            dispatch({type: SET_ERRORS, payload: {error: state.authenticated ? "Failed to get your user data" : null}})
        })
    }, [])

    const register = async (data) => {
        // dispatch({type: LOADING_USER})
        try {
            const res = await axios.post("http://localhost:5000/auth/register", data)
            console.log(res)
            dispatch({type: SET_USER, payload: res.data})
            // history.push("/home")
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to register"}})
            console.log(error)
        }
    }
    // const updateUser = (data) => {
    //     dispatch({type: UPDATE_USER, payload: data})
    // }
    const login = async (data) => {
        // dispatch({type: LOADING_USER})
        try {
            const res = await axios.post("http://localhost:5000/auth/login", data)
            dispatch({type: SET_USER, payload: res.data})
            // history.push("/home")
        }
        catch(err) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to log in"}})
            console.log(err)
        }
    }
    const logout = () => {
        dispatch({type: LOG_OUT})
        window.location.reload()
    }
    const googleSignIn = async(data) => {
        // dispatch({type: LOADING_USER})
        try {
            const res = await axios.post("http://localhost:5000/auth/google", data)
            dispatch({type: SET_USER, payload: res.data})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to sign in with google"}})
            console.error(error)
        }
    }
    const clearErrors = () => {
        dispatch({type: CLEAR_ERRORS})
    }
    const acceptRequest = async(id) => {
        try {
            await axios.post("http://localhost:5000/users/"+ id + "/accept")
            dispatch({type: ACCEPT_REQUEST, payload: id})
        }
        catch(error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to accept request"}})
        }
    }
    const rejectRequest = async(id) => {
        // TODO: FINISH
        try {
            const res = await axios.post("http://localhost:5000/users/" + id + "/reject")
            console.log(res.data)
            dispatch({type: DECLINE_REQUEST, payload: id})
        }catch(err) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to reject request"}})
        }
    }
    const sendRequest = async(id) => {
        //TODO: FINSIH
        try {
            const res = await axios.post("http://localhost:5000/users/" + id)
            console.log(res.data)
        } catch(err) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to send the request"}})
        }
    }

    const unfollow = async(id) => {
        // TODO:
    }

    const updateBio = async(bio) => {
        try {
            const res = await axios.put("http://localhost:5000/users/bio", {bio})
            console.log(res.data)
            dispatch({type: UPDATE_BIO, payload: bio})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to update bio"}})    
        }
    }

    const updateImage = async () => {
        try {
            // TODO:
            await axios.put("http://localhost:5000/users/profile_pic")
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to update the image"}})    
        }
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
      sendRequest,
      updateBio,
      updateImage,
      unfollow
    }
      return (
          <AuthContext.Provider value={value}>
              {!state.loading && children}
          </AuthContext.Provider>
      )
  }