import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { colleges } from '@/data/colleges';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
    try {
        const preferences = await request.json();
        
        const prompt = `
            당신은 가천대학교의 입학 상담 전문가입니다.
            학생의 정보를 바탕으로 가장 적합한 단과대학을 추천해주세요.

            학생 정보:
            - 관심분야: ${preferences.interests.join(', ')}
            - 과목별 성적:
              * 수학: ${preferences.subjects.math}점
              * 과학: ${preferences.subjects.science}점
              * 국어: ${preferences.subjects.language}점
              * 사회: ${preferences.subjects.social}점
              * 예술: ${preferences.subjects.art}점
            - 희망진로: ${preferences.careerGoals.join(', ')}
            - 성격: ${preferences.personality.join(', ')}

            다음 형식으로 3개의 단과대학을 추천해주세요:

            [단과대학명] (매칭점수: 90)
            - 추천이유1
            - 추천이유2
            - 추천이유3
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            store: true,
            messages: [{ 
                role: "system", 
                content: "당신은 가천대학교의 입학 상담 전문가입니다. 학생들의 적성과 성적을 분석하여 가장 적합한 단과대학을 추천해주는 역할을 합니다."
            },
            {
                role: "user",
                content: prompt
            }],
        });

        const content = response.choices[0].message.content || '';
        
        const recommendations = content.split('\n\n').map(block => {
            const [title, ...reasons] = block.split('\n');
            const collegeName = title.match(/\[(.*?)\]/)?.[1] || '';
            const matchScore = parseInt(title.match(/매칭점수: (\d+)/)?.[1] || '0');
            
            return {
                collegeName,
                matchScore,
                reasons: reasons.map(r => r.replace(/^- /, ''))
            };
        }).filter(rec => rec.collegeName);

        return NextResponse.json({ recommendations });
    } catch (error) {
        console.error('추천 처리 중 오류:', error);
        return NextResponse.json(
            { error: '추천 처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
} 