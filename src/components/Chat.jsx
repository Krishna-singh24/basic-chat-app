import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from "../firebase-config";

export const Chat = (props) => {
   const { rooms } = props;
   const [newMessage, setNewMessage] = useState('');
   const [messages, setMessages] = useState([]);

   const messageRef = collection(db, 'messages')



   useEffect(() => {
      const queryMessage = query(messageRef, where('room', '==', rooms), orderBy('createdAt'))
      const unsuscribe = onSnapshot(queryMessage, (snapShot) => {
         let messages = [];
         snapShot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id })
         })
         setMessages(messages)
      })
      return () => unsuscribe();
   }, [])

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (newMessage === "") return;

      await addDoc(messageRef, {
         text: newMessage,
         createdAt: serverTimestamp(),
         user: auth.currentUser.displayName,
         room: rooms,
      })

      setNewMessage('');

   }

   return (
      <div className="chat-app">
         <div className="header">
            <h1>Welcome  to: {rooms.toUpperCase()}</h1>
         </div>
         <div className="messages">
            {messages.map((message) => (
               <div className="message" key={message.id}>
                  <span className="user">{message.user}   </span>
                  {message.text}
                  
                  {/* {message.createdAt.toDate().toLocaleTimeString()} */}
               </div>
            ))}
         </div>
         <form onSubmit={handleSubmit} className="new-message-form">
            <input
               className="new-message-input"
               placeholder="type your message here..."
               onChange={(e) => setNewMessage(e.target.value)}
               value={newMessage}
            />
            <button className="send-button" type="submit">Send</button>
         </form>
      </div>
   )
}