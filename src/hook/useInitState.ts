import { RootState, RootThunkAction } from "@/types/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const useInitState = (action:()=>RootThunkAction) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(action())
  },[dispatch,action])
  const state = useSelector((state:RootState)=>state)
  return state
}