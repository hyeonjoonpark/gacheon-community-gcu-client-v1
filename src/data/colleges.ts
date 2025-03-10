import { College } from '../types/college';

export const colleges: College[] = [
    {
        title: "가천리버럴아츠칼리지",
        description: "박애·봉사·애국의 교육이념을 실천하는 'G형 인재' 양성",
        icon: "📚",
        departments: [
            { name: "자유전공" }
        ],
        details: [
            {
                title: "교육목표",
                items: [
                    "올바른 세계관과 건전한 가치관을 바탕으로 한 인성 함양",
                    "비판적 사고와 합리적 의사소통을 통한 이해 확장",
                    "공동체적 문화적 삶을 위한 자질 함양"
                ]
            },
            {
                title: "주요업무",
                items: [
                    "교양교육 발전계획 수립과 추진",
                    "교양교육과정 편성 및 운영",
                    "교양과목 개·폐설 관리"
                ]
            }
        ]
    },
    {
        title: "경영대학",
        description: "글로벌 비즈니스 리더 양성",
        icon: "💼",
        departments: [
            { name: "경영학부" },
            { name: "금융.빅데이터학부" }
        ],
        details: [
            {
                title: "연혁",
                items: [
                    "1982년 경영학과 개설",
                    "2013년 경상대학에서 경영대학으로 분리",
                    "현재 경영학부, 금융수학과 운영"
                ]
            },
            {
                title: "교육목표",
                items: [
                    "글로벌사회를 선도할 전문성과 창의성을 갖춘 경쟁력 있는 인재 양성",
                    "윤리의식을 가지고 사회적 책임을 실천하는 인재 양성",
                    "다학제적 지식을 가지고 복잡한 경영환경에 대응하는 탐구적 인재 양성"
                ]
            },
            {
                title: "주요 교육과정",
                items: [
                    "회계・세무, 재무, 마케팅, 인사・조직 등 전공과목",
                    "어학 및 컴퓨터능력 등 실무능력 배양",
                    "글로벌 경영 전문가 양성 프로그램"
                ]
            }
        ]
    },
    {
        title: "사회과학대학",
        description: "사회현상의 체계적 연구와 실천",
        icon: "🌏",
        departments: [
            { name: "미디어커뮤니케이션학과" },
            { name: "관광경영학과" },
            { name: "경제학과" },
            { name: "의료산업경영학과" },
            { name: "응용통계학과" },
            { name: "사회복지학과" },
            { name: "유아교육학과" },
            { name: "심리학과" },
            { name: "패션산업학과" }
        ],
        details: [
            {
                title: "교육 특징",
                items: [
                    "교육과 산업현장을 연계한 실천지향적 교육 제공",
                    "전문적 분석 능력과 실무적 문제해결 능력 개발",
                    "글로벌 마인드를 갖춘 리더 양성"
                ]
            },
            {
                title: "교육목표",
                items: [
                    "미래를 책임지는 지성인: 합리적 사고에 기초한 분석력과 대안 제시 능력 배양",
                    "나눔에 동참하는 실천인: 인류와 진심으로 소통하는 감성적 인재 양성",
                    "최고를 추구하는 전문인: 현실적이고 효율적인 해결책을 제시하는 전문가 육성",
                    "인류와 함께하는 세계인: 세계적 차원에서 인류 보편적 가치를 구현하는 인재 양성"
                ]
            },
            {
                title: "핵심 역량",
                items: [
                    "사회현상에 대한 체계적 분석 능력",
                    "실질적인 문제 해결 능력",
                    "글로벌 시민의식과 소통 능력"
                ]
            }
        ]
    },
    {
        title: "AI인문대학",
        description: "AI 시대를 선도하는 융합형 인재 양성",
        icon: "🧠",
        departments: [
            { name: "한국어문학과" },
            { name: "영미어문학과" },
            { name: "동양어문학과" },
            { name: "유럽어문학과" },
        ],
        details: [
            {
                title: "교육 특징",
                items: [
                    "원어 전용 전공수업과 학술 소모임 운영",
                    "문학사·문학이론·문학장르·창작 심화 교육",
                    "회화·작문·독해 중심의 실용적 어학교육"
                ]
            },
            {
                title: "교육목표",
                items: [
                    "사람다움의 정체성 확인과 인문교육을 통한 이해",
                    "언어교육을 통한 인간교류 증대",
                    "외국어교육을 통한 미래정보 사회 적응력 함양"
                ]
            },
            {
                title: "핵심 가치",
                items: [
                    "문화의 향유와 창조: 문학교육을 통한 문화적 소양 증진",
                    "세계인과 함께하는 인문인: 한국문학과 외국어 교육 조화",
                    "봉사정신과 인류 공동체 지향"
                ]
            },
            {
                title: "특성화 방향",
                items: [
                    "AI 기술과 인문학의 융합 교육",
                    "글로벌 소통 능력 강화",
                    "창의적 문화콘텐츠 제작 역량 개발"
                ]
            }
        ]
    },
    {
        title: "법과대학",
        description: "법률전문가 양성의 요람",
        icon: "⚖️",
        departments: [
            { name: "법학과" },
            { name: "경찰행정학과" },
            { name: "행정학과" },
            { name: "경찰학연계전공" }
        ],
        details: [
            {
                title: "교육 특징",
                items: [
                    "법학연구소를 통한 학술세미나 및 연구논문 발간",
                    "법대고시관, 스터디룸, 독서실 등 시험 준비 시설 운영",
                    "법률실무 응용능력 중심의 실무교육"
                ]
            },
            {
                title: "인재 양성 분야",
                items: [
                    "전문지식과 실무능력을 갖춘 법률전문가",
                    "국민 안전 및 범죄 예방 담당 경찰 인재",
                    "공공정책 분석 및 실행 능력 보유 행정전문가"
                ]
            },
            {
                title: "주요 교육과정",
                items: [
                    "법조윤리교육 및 법학전문교육",
                    "경찰 및 안보실무교육",
                    "행정과 정책의 집행 및 분석평가교육",
                    "지방자치실무교육 및 정보화교육"
                ]
            },
            {
                title: "지원 시설",
                items: [
                    "법대고시관 운영",
                    "과 스터디룸 제공",
                    "전용 독서실 운영"
                ]
            }
        ]
    },
    {
        title: "공과대학",
        description: "미래 산업을 선도하는 공학인재 양성",
        icon: "⚙️",
        departments: [
            { name: "도시계획학전공" },
            { name: "조경학전공" },
            { name: "실내건축학전공" },
            { name: "건축학전공" },
            { name: "건축공학전공" },
            { name: "설비·소방공학과" },
            { name: "화공생명공학과" },
            { name: "기계공학전공" },
            { name: "산업공학전공" },
            { name: "스마트팩토리전공" },
            { name: "토목환경공학과" },
            { name: "산소재공학과" },
            { name: "바이러공학과" },
            { name: "미래자동차학과" }
        ],
        details: [
            {
                title: "인재상",
                items: [
                    "도덕적 책임의식을 지닌 공학인재",
                    "글로벌 핵심 공학 역량을 갖춘 인재",
                    "미래사회 선도적 기술 역량 보유 전문가"
                ]
            },
            {
                title: "교육목표",
                items: [
                    "인간생활의 질적 향상을 위한 교육 및 연구",
                    "최첨단산업을 선도할 고급기술인력 양성",
                    "산학협동체계 구축을 위한 현장중심 교육"
                ]
            },
            {
                title: "핵심 역량",
                items: [
                    "창의적 문제해결 능력",
                    "현장 실무 적용 능력",
                    "글로벌 공학기술 역량"
                ]
            },
            {
                title: "특성화 방향",
                items: [
                    "산학협력 중심의 실무교육 강화",
                    "첨단 공학기술 연구 및 개발",
                    "글로벌 공학교육 인증 추진"
                ]
            }
        ]
    },
    {
        title: "바이오나노대학",
        description: "바이오기술과 나노기술의 융합 연구",
        icon: "🧬",
        departments: [
            { name: "물리학과" },
            { name: "화학과" },
            { name: "생명과학과" },
            { name: "바이오나노학과" },
            { name: "식품영양학과" },
            { name: "식품생명공학과" }
        ],
        details: [
            {
                title: "교육 분야",
                items: [
                    "물리, 화학, 바이오나노, 생명과학",
                    "식품생명공학 및 영양학",
                    "융합 교육과정 운영"
                ]
            },
            {
                title: "핵심 기술",
                items: [
                    "바이오기술(BT)",
                    "정보기술(IT)",
                    "나노기술(NT)",
                    "의공학 기술(MT)"
                ]
            },
            {
                title: "교육목표",
                items: [
                    "바이오나노 융합기술 분야의 전문인력 양성",
                    "창의적 사고 능력과 미래 지향적 가치관을 지닌 탐구적 지성인 육성",
                    "실무 연구능력을 갖춘 전문가 배출"
                ]
            },
            {
                title: "특성화 전략",
                items: [
                    "내실 있는 이론 강의와 효율적인 실험실습",
                    "학연산 협력체계 구축",
                    "국내 우수 연구기관과의 연계를 통한 연구중심 시스템"
                ]
            }
        ]
    },
    {
        title: "반도체대학",
        description: "세계 최초 반도체 단과대학",
        icon: "🔧",
        departments: [
            { name: "전자공학전공" },
            { name: "반도체공학전공" },
            { name: "차세대반도체설계전공" },
            { name: "반도체.디스플레이학과" },
            { name: "반도체설계학과" },
        ],
        details: [
            {
                title: "교육 목표",
                items: [
                    "AI 사회 발전에 부응하는 창의적 전문 기술인 양성",
                    "나눔에 동참하는 실천하는 첨단 분야 인재 육성",
                    "반도체 분야의 국가 발전에 기여할 최고 전문인 양성"
                ]
            },
            {
                title: "전문 분야",
                items: [
                    "반도체소자공학",
                    "반도체설계",
                    "전자공학 기초"
                ]
            },
            {
                title: "특성화 전략",
                items: [
                    "전문화된 학문과 응용원리 중심 교육",
                    "산학 협동 체제 구축",
                    "글로벌 공동연구 추진"
                ]
            },
            {
                title: "핵심 역량",
                items: [
                    "첨단 반도체 전문 지식",
                    "실무 중심의 현장 적용 능력",
                    "글로벌 협력 연구 능력"
                ]
            }
        ]
    },
    {
        title: "IT융합대학",
        description: "디지털 혁신을 주도하는 IT인재 양성",
        icon: "💻",
        departments: [
            { name: "AI·소프트웨어학부" },
            { name: "컴퓨터공학전공" },
            { name: "스마트보안전공" },
            { name: "전기공학과" },
            { name: "스마트시티학과" },
            { name: "의공학과" },
            { name: "에너지IT학과" },
            { name: "클라우드공학과" },
            { name: "바이오의료기기학과" },
            { name: "게임·영상학과" }
        ],
        details: [
            {
                title: "교육목표",
                items: [
                    "탐구적 지성인: 미래지향적 탐구 능력을 갖춘 인재 양성",
                    "창의적 기술인: 창조적 응용능력을 갖춘 인재 양성",
                    "자주적 세계인: 글로벌 경쟁력을 갖춘 인재 양성"
                ]
            },
            {
                title: "핵심 역량",
                items: [
                    "IT 기초 및 응용 이론",
                    "IT융합 시스템 설계 및 연구",
                    "실용적 소프트웨어 개발 능력"
                ]
            }
        ]
    },
    {
        title: "한의과대학",
        description: "전통의학과 현대의학의 융합",
        icon: "🏥",
        departments: [
            { name: "한의예과" },
            { name: "한의학과" }
        ],
        details: [
            {
                title: "교육과정",
                items: [
                    "예과 2년, 본과 4년 과정",
                    "동양철학 기반 학술이론",
                    "임상기법 실습 교육"
                ]
            },
            {
                title: "교육목표",
                items: [
                    "사회변화에 부응하는 전문지식을 갖춘 한의사 양성",
                    "널리 사랑을 실천하고 나눔에 동참하는 한의사 양성",
                    "세계로 진출하는 국제적 안목과 능력을 갖춘 한의사 양성"
                ]
            }
        ]
    },
    {
        title: "예술·체육대학",
        description: "문화예술과 체육 분야의 전문가 양성",
        icon: "🎨",
        departments: [
            { name: "회화·조소전공" },
            { name: "시각디자인전공" },
            { name: "패션디자인전공" },
            { name: "산업디자인전공" },
            { name: "성악전공" },
            { name: "기악전공" },
            { name: "작곡전공" },
            { name: "체육전공" },
            { name: "태권도전공" },
            { name: "연기예술학과" }
        ],
        details: [
            {
                title: "전공 분야",
                items: [
                    "미술: 동양화, 서양화, 조소",
                    "디자인: 시각, 산업, 패션",
                    "음악: 성악, 기악, 작곡",
                    "체육, 태권도, 연기예술"
                ]
            },
            {
                title: "교육 특징",
                items: [
                    "예체능적 감성과 이론 기반 실기 교육",
                    "인문, 사회학적 소양 배양",
                    "4차 산업혁명 시대의 IT 기술능력 함양"
                ]
            },
            {
                title: "교육목표",
                items: [
                    "국제 경쟁력을 갖춘 창의적 예술인 양성",
                    "전인적 음악인 및 음악 교육인 육성",
                    "심미적 안목을 갖춘 체육인 양성"
                ]
            }
        ]
    },
    {
        title: "국제대학",
        description: "글로벌 시대의 국제전문가 양성",
        icon: "🌍",
        departments: [
            { name: "국제자유전공" },
            { name: "한국학전공" },
            { name: "경영학과" },
            { name: "컴퓨터공학과" },
            { name: "미디어커뮤니케이션학과" },
            { name: "심리학과" },
            { name: "관광경영학과" },
            { name: "한국어교육학과" }
        ],
        details: [
            {
                title: "설립 목적",
                items: [
                    "외국인 유학생 대상 교양 및 전공 교육",
                    "'박애, 봉사, 애국' 교육 이념 실천",
                    "국경을 넘는 교류를 통한 인성과 창의력 함양"
                ]
            },
            {
                title: "교육목표",
                items: [
                    "건전한 가치관과 올바른 세계관 확립",
                    "대한민국과 모국, 지구촌에 기여하는 인재 양성",
                    "글로벌 시민의식 함양"
                ]
            },
            {
                title: "주요업무",
                items: [
                    "국제대학 소속 전공 및 교양 수업 관리",
                    "외국인 유학생의 학사, 장학 지원과 체류 관리",
                    "한국어능력 취득 및 관련 교육 지원"
                ]
            }
        ]
    }
];