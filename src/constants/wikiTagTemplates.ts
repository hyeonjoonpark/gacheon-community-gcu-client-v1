interface TagTemplate {
  tag: string;
  defaultText: string;
  render: (content: string, color?: string) => string;
}

export const WIKI_TAG_TEMPLATES: Record<string, TagTemplate> = {
  색상: {
    tag: '색상',
    defaultText: '색상이 적용된 텍스트',
    render: (content: string, color: string = 'red') => 
      `<색상 color="${color}">${content}</색상>`
  },
  어록: {
    tag: '어록',
    defaultText: '있는 그대로 있어줘',
    render: (content: string) => `<어록>${content}</어록>`
  },
  링크: {
    tag: '링크',
    defaultText: '사건의 링크 문서',
    render: (content: string) => `<링크>${content}</링크>`
  },
  소제목: {
    tag: '소제목',
    defaultText: '소제목',
    render: (content: string) => `<소제목>${content}</소제목>`
  },
  취소선: {
    tag: '취소선',
    defaultText: '사실 그런 적 없다',
    render: (content: string) => `<취소선>${content}</취소선>`
  },
  강조: {
    tag: '강조',
    defaultText: '매우 중요한',
    render: (content: string) => `<강조>${content}</강조>`
  },
  빙글빙글: {
    tag: '빙글빙글',
    defaultText: '돌아가는',
    render: (content: string) => `<빙글빙글>${content}</빙글빙글>`
  },
  사라지기: {
    tag: '사라지기',
    defaultText: '사라지는 글자',
    render: (content: string) => `<사라지기>${content}</사라지기>`
  },
}

export const insertWikiTag = (tag: string, color?: string): string => {
  const template = WIKI_TAG_TEMPLATES[tag]
  if (!template) return ''
  
  return template.render(template.defaultText, color)
} 