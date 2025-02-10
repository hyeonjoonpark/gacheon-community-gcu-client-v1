import { create } from 'zustand'

interface Position {
  x: number
  y: number
}

interface ChatMessage {
  id: string
  text: string
  timestamp: Date
  sender: 'user' | 'other'
}

interface ChatRoom {
  id: string
  department: string
  isOpen: boolean
  isMinimized: boolean
  messages: ChatMessage[]
  position: Position
}

interface ChatStore {
  chatRooms: { [key: string]: ChatRoom }
  toggleChat: (id: string, isOpen: boolean) => void
  createRoom: (id: string, department: string) => void
  closeRoom: (id: string) => void
  minimizeChat: (id: string) => void
  maximizeChat: (id: string) => void
  addMessage: (roomId: string, message: ChatMessage) => void
  getMessages: (roomId: string) => ChatMessage[]
  updatePosition: (roomId: string, position: Position) => void
  getPosition: (roomId: string) => Position
  isRoomOpen: (id: string) => boolean
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chatRooms: {},

  toggleChat: (id: string, isOpen: boolean) => {
    set((state) => ({
      chatRooms: {
        ...state.chatRooms,
        [id]: {
          ...state.chatRooms[id],
          isOpen
        }
      }
    }))
  },

  createRoom: (id: string, department: string) => set((state) => ({
    chatRooms: {
      ...state.chatRooms,
      [id]: {
        id,
        department,
        isOpen: true,
        isMinimized: false,
        messages: [],
        position: { x: 0, y: 0 }
      }
    }
  })),

  closeRoom: (id: string) => {
    set((state) => ({
      chatRooms: {
        ...state.chatRooms,
        [id]: {
          ...state.chatRooms[id],
          isOpen: false
        }
      }
    }))
  },

  minimizeChat: (roomId: string) => {
    set((state) => {
      const updatedRoom = {
        ...state.chatRooms[roomId],
        isMinimized: true
      };
      
      return {
        chatRooms: {
          ...state.chatRooms,
          [roomId]: updatedRoom
        }
      };
    });
  },

  maximizeChat: (roomId: string) => {
    set((state) => ({
      chatRooms: {
        ...state.chatRooms,
        [roomId]: {
          ...state.chatRooms[roomId],
          isMinimized: false
        }
      }
    }))
  },

  addMessage: (roomId: string, message: ChatMessage) => {
    set((state) => ({
      chatRooms: {
        ...state.chatRooms,
        [roomId]: {
          ...state.chatRooms[roomId],
          messages: [...state.chatRooms[roomId].messages, message]
        }
      }
    }))
  },

  getMessages: (roomId: string) => {
    const state = get()
    return state.chatRooms[roomId]?.messages || []
  },

  updatePosition: (roomId: string, position: Position) => {
    set((state) => ({
      chatRooms: {
        ...state.chatRooms,
        [roomId]: {
          ...state.chatRooms[roomId],
          position
        }
      }
    }))
  },

  getPosition: (roomId: string) => {
    const state = get()
    return state.chatRooms[roomId]?.position || { x: 0, y: 0 }
  },

  isRoomOpen: (id: string) => {
    return get().chatRooms[id]?.isOpen ?? false;
  }
}))

export const initializeChatStore = () => {
  if (typeof window !== 'undefined') {
    useChatStore.setState({
      chatRooms: {}
    });
  }
}; 