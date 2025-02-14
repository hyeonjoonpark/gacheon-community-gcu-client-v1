'use client';

import { useRouter } from 'next/navigation';
import { usePostStore } from '@/store/postStore';
import { BoardType } from '@/store/postStore';
import { useSaveCommunityMutation, CommunityType } from '@/generated/graphql';

export default function CommunityNewPage() {
    const router = useRouter();
    const { post, setPost, resetPost, tags, setTags, tagInput, setTagInput } = usePostStore();
    
    const saveCommunity = useSaveCommunityMutation({
        onCompleted: (data) => {
            console.log('게시글 작성 성공:', data.saveCommunity);
            alert('게시글이 작성되었습니다.');
            resetPost();
            router.push('/community');
        },
        onError: (error) => {
            console.error('게시글 작성 실패:', error);
            alert('게시글 작성에 실패했습니다: ' + error.message);
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const requestVariables = {
                communityRequest: {
                    title: post.title,
                    content: post.content,
                    type: post.boardType as CommunityType,
                    tags: tags
                }
            };
            
            console.log('Request variables:', requestVariables);
            
            await saveCommunity[0]({
                variables: requestVariables,
                context: {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            });
        } catch (err) {
            console.error('Full error:', err);
        }
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const boardTypes = [
        { value: 'FREE', label: '자유게시판' },
        { value: 'DEPARTMENT', label: '학과게시판' },
        { value: 'STUDENT', label: '학생게시판' },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">새 게시글 작성</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        게시판 선택
                    </label>
                    <div className="flex gap-2">
                        {boardTypes.map((type) => (
                            <button
                                key={type.value}
                                type="button"
                                onClick={() => setPost({ boardType: type.value as BoardType })}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    post.boardType === type.value
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        태그
                    </label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-lg min-h-[42px]">
                        {tags.map((tag) => (
                            <span 
                                key={tag} 
                                className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-sm"
                            >
                                #{tag}
                                <button
                                    onClick={() => removeTag(tag)}
                                    className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </span>
                        ))}
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            placeholder="태그를 입력하고 Enter를 누르세요"
                            className="flex-1 min-w-[120px] outline-none bg-transparent"
                        />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Enter를 눌러 태그를 추가할 수 있습니다
                    </p>
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