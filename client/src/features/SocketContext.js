import React, {
    createContext,
    useContext,
    useRef,
    useEffect,
    useState,
  } from 'react'
  import { useSelector } from "react-redux";
  import io, { Socket } from 'socket.io-client'
  
  export const SocketContext = createContext()
 
  
  export const SocketProvider = ({ children, store }) => {
      const { user } = useSelector((state) => state.auth);
    
    const [isConnected, setConnected] = useState(false)
  
    const socketUrl = "http://localhost:3001/"
  
    const socket = useRef(Socket)
  
    const handleOnMessage = message => {
      console.log(message)
      // store.dispatch here
    }
  
    useEffect(() => {

      socket.current = io(socketUrl, {
        transports: ['websocket'],
        query: {
          token: user
        }
    }
    
        )
  
        socket.current.on('connection', () => {
          console.info(`Successfully connected to socket at ${socketUrl}`)
          setConnected(true)
        })
  
        socket.current.on('disconnect', () => {
          console.info(`Successfully disconnected`)
          setConnected(false)
        })
        
        socket.current.on('message', handleOnMessage)
        // socket.current.emit('message', {message,room,name:user}, handleOnMessage)
    
  
    
    }, [])
  
    return (
      <SocketContext.Provider value={socket.current}>
        {children}
      </SocketContext.Provider>
    )
  }
 
  export const useSocket = () => useContext(SocketContext)