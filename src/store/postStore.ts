import { create } from 'zustand';

interface Post {
    title: string;
    content: string;
    category: string;
}

interface PostStore {
    post: Post;
    setPost: (post: Partial<Post>) => void;
    resetPost: () => void;
    submitPost: () => Promise<boolean>;
}

const initialPost = {
    title: '',
    content: '',
    category: 'general'
};

export const usePostStore = create<PostStore>((set, get) => ({
    post: initialPost,
    setPost: (newPost) => set((state) => ({
        post: { ...state.post, ...newPost }
    })),
    resetPost: () => set({ post: initialPost }),
    submitPost: async () => {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(get().post)
            });
            
            if (!response.ok) throw new Error('게시글 작성 실패');
            return true;
        } catch (error) {
            console.error('게시글 작성 중 오류:', error);
            return false;
        }
    }
})); 