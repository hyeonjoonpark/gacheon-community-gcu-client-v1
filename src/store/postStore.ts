import { create } from 'zustand';

interface Post {
    title: string;
    content: string;
    category: string;
}

export type BoardType = 'FREE' | 'DEPARTMENT' | 'STUDENT';

interface PostStore {
    post: {
        title: string;
        content: string;
        boardType: BoardType;
    };
    tags: string[];
    tagInput: string;
    setPost: (post: Partial<PostStore['post']>) => void;
    setTags: (tags: string[]) => void;
    setTagInput: (input: string) => void;
    submitPost: () => Promise<boolean>;
    resetPost: () => void;
}

const initialPost = {
    title: '',
    content: '',
    category: 'general'
};

export const usePostStore = create<PostStore>((set, get) => ({
    post: {
        title: '',
        content: '',
        boardType: 'FREE',
    },
    tags: [],
    tagInput: '',
    setPost: (newPost) => set((state) => ({
        post: { ...state.post, ...newPost }
    })),
    setTags: (newTags) => set({ tags: newTags }),
    setTagInput: (input) => set({ tagInput: input }),
    resetPost: () => set({
        post: { title: '', content: '', boardType: 'FREE' },
        tags: [],
        tagInput: ''
    }),
    submitPost: async () => {
        try {
            const { post, tags } = get();
            const response = await fetch('http://localhost:8081/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation CreatePost($input: CreatePostInput!) {
                            createPost(input: $input) {
                                id
                                title
                                content
                                boardType
                                tags
                            }
                        }
                    `,
                    variables: {
                        input: {
                            title: post.title,
                            content: post.content,
                            boardType: post.boardType,
                            tags: tags
                        }
                    }
                })
            });

            const data = await response.json();
            return !data.errors;
        } catch (error) {
            console.error('게시글 작성 실패:', error);
            return false;
        }
    }
})); 