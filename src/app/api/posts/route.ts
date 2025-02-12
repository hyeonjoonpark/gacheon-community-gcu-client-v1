import { NextResponse } from 'next/server';

// 더미 데이터 생성
const dummyPosts = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `게시글 제목 ${i + 1}`,
    content: `이것은 게시글 ${i + 1}의 내용입니다. 더미 데이터로 생성된 콘텐츠입니다.`,
    author: `작성자${i + 1}`,
    createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    views: Math.floor(Math.random() * 1000),
    category: ['free', 'department', 'student'][Math.floor(Math.random() * 3)],
}));

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const tab = searchParams.get('tab') || 'free';
    const search = searchParams.get('search') || '';
    
    const itemsPerPage = 10;
    
    // 필터링
    let filteredPosts = dummyPosts.filter(post => {
        const matchesTab = tab === 'all' || post.category === tab;
        const matchesSearch = search === '' || 
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.content.toLowerCase().includes(search.toLowerCase());
        
        return matchesTab && matchesSearch;
    });

    // 페이지네이션
    const totalItems = filteredPosts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const paginatedPosts = filteredPosts.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    // 응답
    return NextResponse.json({
        posts: paginatedPosts,
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage
    });
}

export async function POST(request: Request) {
    try {
        const post = await request.json();
        
        // 실제로는 DB에 저장하겠지만, 여기서는 성공 응답만 반환
        return NextResponse.json({ 
            success: true, 
            message: '게시글이 성공적으로 작성되었습니다.',
            post: {
                id: dummyPosts.length + 1,
                ...post,
                author: '테스트 사용자',
                createdAt: new Date().toISOString(),
                views: 0
            }
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: '게시글 작성에 실패했습니다.' },
            { status: 500 }
        );
    }
} 