import { useEffect, useContext, useReducer, createContext} from "react"
import authReducer from "./AuthReducer"
import { LOADING_USER, LOG_OUT, SET_ERRORS, SET_USER, UPDATE_USER} from "./types"
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
    axios.defaults.headers.common['Authorization'] = state.token;

    useEffect(() => {
        //TODO: TEST THIS OUT A BIT
        axios.get("http://localhost:5000/users/me").then(res => {
            console.log(res.data)
            dispatch({type: SET_USER, payload: res.data})
        }).catch(error => {
            dispatch({type: SET_ERRORS, payload: error})
        })
    }, [])

    const register = async (data) => {
        dispatch({type: LOADING_USER})
        try {
            const res = await axios.post("http://localhost:5000/auth/register", data)
            console.log(res)
            dispatch({type: SET_USER, payload: res.data})
            // history.push("/home")
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: error})
            console.error(error)
        }
    }
    const updateUser = (data) => {
        dispatch({type: UPDATE_USER, payload: data})
    }
    const login = async (data) => {
        dispatch({type: LOADING_USER})
        try {
            const res = await axios.post("http://localhost:5000/auth/login", data)
            dispatch({type: SET_USER, payload: res.data})
            // history.push("/home")
        }
        catch(err) {
            dispatch({type: SET_ERRORS, payload: err})
            console.error(err)
        }
    }
    const logout = () => {
        dispatch({type: LOG_OUT})
    }
    const googleSignIn = async(data) => {
        dispatch({type: LOADING_USER})
        try {
            const res = await axios.post("http://localhost:5000/auth/google", data)
            dispatch({type: SET_USER, payload: res.data})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: error})
            console.error(error)
        }
    }
    const value = {
      state,
      dispatch, 
      register, 
      login,
      logout, 
      updateUser,
      googleSignIn
    }
      return (
          <AuthContext.Provider value={value}>
              {!state.loading && children}
          </AuthContext.Provider>
      )
  }