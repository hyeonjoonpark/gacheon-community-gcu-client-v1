'use client';

import { useRouter } from 'next/navigation';
import { usePostStore } from '@/store/postStore';

export default function CommunityNewPage() {
    const router = useRouter();
    const { post, setPost, submitPost, resetPost } = usePostStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await submitPost();
        if (success) {
            resetPost();
            router.push('/community');
        } else {
            alert('게시글 작성에 실패했습니다.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">새 게시글 작성</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        카테고리
                    </label>
                    <select
                        value={post.category}
                        onChange={(e) => setPost({ category: e.target.value })}
                        className="w-full p-2 border rounded text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                    >
                        <option value="general">일반</option>
                        <option value="question">질문</option>
                        <option value="info">정보</option>
                        <option value="review">후기</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        제목
                    </label>
                    <input
                        type="text"
                        value={post.title}
                        onChange={(e) => setPost({ title: e.target.value })}
                        className="w-full p-2 border rounded text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                        placeholder="제목을 입력하세요"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        내용
                    </label>
                    <textarea
                        value={post.content}
                        onChange={(e) => setPost({ content: e.target.value })}
                        className="w-full p-2 border rounded h-64 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                        placeholder="내용을 입력하세요"
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        작성하기
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            resetPost();
                            router.back();
                        }}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
}