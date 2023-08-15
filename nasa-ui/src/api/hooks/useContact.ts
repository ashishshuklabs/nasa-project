import { useEffect, useState } from "react"

const useContact = (id: string) => {
    const [initialRender, setInitialRender] = useState(true)
    if(typeof window === 'undefined') {
        console.log('This is being called by the server.....')
        
    }
    useEffect(() => {
        setInitialRender(false) // client side now....
    }, [])

    return {
        initialRender
    }
}

export default useContact