import { useEffect, useReducer } from 'react'

const initialState = { loading: false, error: null, data: null }


function fetchReducer(state, action){
switch(action.type){
case 'FETCH_INIT':
return { ...state, loading: true, error: null }
case 'FETCH_SUCCESS':
return { ...state, loading: false, data: action.payload }
case 'FETCH_FAILURE':
return { ...state, loading: false, error: action.payload }
default:
return state
}
}


export function useFetch(url, deps = []){
const [state, dispatch] = useReducer(fetchReducer, initialState)


useEffect(() => {
if(!url) return
let cancelled = false
dispatch({ type: 'FETCH_INIT' })
fetch(url)
.then(res => {
if(!res.ok) throw new Error('Network response was not ok')
return res.json()
})
.then(data => { if(!cancelled) dispatch({ type: 'FETCH_SUCCESS', payload: data }) })
.catch(err => { if(!cancelled) dispatch({ type: 'FETCH_FAILURE', payload: err.message }) })


return () => { cancelled = true }
// deps array controls when this effect runs
}, deps)


return state
}