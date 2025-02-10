import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

let isScrapingInProgress = false;

export async function GET() {
    if (isScrapingInProgress) {
        return NextResponse.json(
            { success: false, message: '이미 스크래핑이 진행 중입니다.', data: [] },
            { status: 400 }
        );
    }
    
    let browser = null;
    isScrapingInProgress = true;
    
    try {
        console.log('브라우저 시작 중...');
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--no-zygote',
                '--single-process',
            ]
        });

        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(60000);
        
        console.log('페이지 이동 중...');
        await page.goto('https://www.gachon.ac.kr/pr/1443/subview.do', {
            waitUntil: 'networkidle0'
        });

        console.log('데이터 추출 중...');
        const notices = await page.evaluate(() => {
            const rows = document.querySelectorAll('table.board-table tbody tr');
            return Array.from(rows).map((row, index) => ({
                id: index + 1,
                title: row.querySelector('td.td-subject')?.textContent?.trim() || '제목 없음',
                date: row.querySelector('td.td-date')?.textContent?.trim() || '',
                category: '가천뉴스',
                writer: row.querySelector('td.td-write')?.textContent?.trim() || '',
                views: row.querySelector('td.td-access')?.textContent?.trim() || '0',
                link: row.querySelector('td.td-subject a')?.getAttribute('href') || '',
            }));
        });

        if (!notices.length) {
            return NextResponse.json(
                { success: false, message: '공지사항을 찾을 수 없습니다.', data: [] },
                { status: 404 }
            );
        }

        const processedNotices = notices.map(notice => ({
            ...notice,
            link: notice.link.startsWith('http') ? notice.link : `https://www.gachon.ac.kr${notice.link}`
        }));

        return NextResponse.json(
            { success: true, data: processedNotices },
            { 
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            }
        );

    } catch (error) {
        console.error('스크래핑 에러:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: error instanceof Error ? error.message : '스크래핑 중 오류가 발생했습니다.',
                data: [] 
            },
            { status: 500 }
        );
    } finally {
        if (browser) {
            await browser.close();
        }
        isScrapingInProgress = false;
    }
}

// OPTIONS 메서드 핸들러 추가
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3001',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
} 