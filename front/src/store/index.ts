import { Message, User } from "src/types";
import { create } from "zustand";

type ConversationState = {
    selectedConversation: User | null;
    messages: Message[];
    users: User[];
    notifications: string[],
    setSelectedConversation: (selectedConversation: User | null) => void;
    setMessages: (messages: Message[]) => void;
    setUsers: (users: User[]) => void;
    setNotifications: (notifications: string[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation: User | null) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages: Message[]) => set({ messages }),
    users: [],
    setUsers: (users: User[]) => set({ users }),
    notifications: [],
    setNotifications: (notifications: string[]) => set({ notifications })

}))

export default useConversation