import { useEffect } from "react"
import { database } from "../services/firebase";

export function AllRooms() {
    useEffect(() => {
        const roomsRef = database.ref(`rooms`);
        roomsRef.on('value', async () => {
            console.log('i')
            const rooms = (await roomsRef.get()).val()
            //const firebaseRooms: FirebaseRooms = databaseRooms.rooms ?? {};
            console.log(rooms)
           
        })
        
        return (
            roomsRef.off('value')
        )
    })
    return(
        <div>

        </div>
    )
}