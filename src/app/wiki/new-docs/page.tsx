"use client"

import { useState } from 'react'
import { insertWikiTag } from '@/constants/wikiTagTemplates'
import { useRouter } from 'next/navigation'

const NewDocs = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedYear, setSelectedYear] = useState<number>(2024)
  const [selectedCategory, setSelectedCategory] = useState<string>('사건/사고')
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [showTagSuggestions, setShowTagSuggestions] = useState(false)
  const [tagSuggestionPosition, setTagSuggestionPosition] = useState({ top: 0, left: 0 })
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  // 사용 가능한 태그 목록
  const availableTags = [
    { name: '어록', description: '인용구나 발언을 표시' },
    { name: '링크', description: '내/외부 링크 추가' },
    { name: '소제목', description: '문서의 소제목 추가' },
    { name: '취소선', description: '취소선 텍스트 표시' },
    { name: '강조', description: '텍스트 강조' },
    { name: '빙글빙글', description: '회전 애니메이션 효과' },
  ]

  // 태그 삽입 함수
  const insertTag = (tag: string, color?: string) => {
    const textarea = document.querySelector('textarea')
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const before = text.substring(0, start)
    const after = text.substring(end)

    const insertion = insertWikiTag(tag, color)
    const newContent = before + insertion + after
    setContent(newContent)
    
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + insertion.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  // 태그 선택 처리
  const handleTagSelect = (tagName: string) => {
    const textarea = document.querySelector('textarea')
    if (!textarea) return

    const start = textarea.selectionStart
    const text = textarea.value
    const before = text.substring(0, start - 1) // '<' 문자 제거
    const after = text.substring(start)

    const insertion = insertWikiTag(tagName)
    const newContent = before + insertion + after
    setContent(newContent)
    setShowTagSuggestions(false)

    // 커서 위치 설정
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + insertion.length - tagName.length - 2 // 닫는 태그 앞으로 이동
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  // 태그 자동완성 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget
    const cursorPosition = textarea.selectionStart
    const textBeforeCursor = textarea.value.substring(0, cursorPosition)
    const textAfterCursor = textarea.value.substring(cursorPosition)

    // Ctrl 키와 함께 눌렸을 때의 단축키 처리
    if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
            case '-':  // 어록
                e.preventDefault()
                insertTag('어록')
                return
            case '.':  // 링크 (Ctrl + > 처리)
            case 'period':
            case '>':
                e.preventDefault()
                insertTag('링크')
                return
            case 'h':  // 소제목
                e.preventDefault()
                insertTag('소제목')
                return
            case 's':  // 취소선
                e.preventDefault()
                insertTag('취소선')
                return
            case 'b':  // 강조
                e.preventDefault()
                insertTag('강조')
                return
            case 't':  // 빙글빙글
                e.preventDefault()
                insertTag('빙글빙글')
                return
            case 'x':  // 사라지기
                e.preventDefault()
                insertTag('사라지기')
                return
        }
    }

    // '<' 입력 시 자동완성 목록 표시
    if (e.key === '<') {
      const rect = textarea.getBoundingClientRect()
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight)
      const { selectionStart } = textarea
      
      // 커서 위치 계산
      const textBeforeCursor = textarea.value.substring(0, selectionStart)
      const lines = textBeforeCursor.split('\n')
      const currentLine = lines.length
      
      // 화면 높이와 자동완성 UI 높이를 고려하여 위치 조정
      const suggestionsHeight = 300 // 자동완성 UI의 대략적인 높이
      const windowHeight = window.innerHeight
      let top = rect.top + (currentLine * lineHeight) - textarea.scrollTop + 20
      
      // 자동완성 UI가 화면 아래로 넘어가는 경우
      if (top + suggestionsHeight > windowHeight) {
        top = top - suggestionsHeight - 40 // UI를 위로 표시
      }

      // 왼쪽 위치 계산 시 화면 너비 고려
      let left = rect.left + (selectionStart - textBeforeCursor.lastIndexOf('\n') - 1) * 8
      const maxLeft = window.innerWidth - 280 // UI 너비(264px) + 여유 공간
      
      // 화면 오른쪽을 벗어나는 경우
      if (left > maxLeft) {
        left = maxLeft
      }
      
      setTagSuggestionPosition({ top, left })
      setShowTagSuggestions(true)
    }

    // ESC 키로 자동완성 닫기
    if (e.key === 'Escape') {
      setShowTagSuggestions(false)
    }

    // '>' 입력 시 자동으로 닫는 태그 추가
    if (e.key === '>') {
      const openTagMatch = textBeforeCursor.match(/<([^/][^>]*)$/)
      if (openTagMatch) {
        e.preventDefault()
        const tagName = openTagMatch[1].trim()
        
        // 이미 닫는 태그가 있는지 확인
        const hasClosingTag = textAfterCursor.includes(`</${tagName}>`)
        
        if (!hasClosingTag) {
          const start = textarea.selectionStart
          const text = textarea.value
          const newText = text.substring(0, start) + '>' + `</${tagName}>` + text.substring(start)
          setContent(newText)
          
          // 커서를 여는 태그와 닫는 태그 사이로 이동
          setTimeout(() => {
            textarea.focus()
            textarea.setSelectionRange(start + 1, start + 1)
          }, 0)
        }
      }
    }
  }

  // 태그 자동 닫기 (입력 중 태그가 완성되지 않은 경우)
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)

    const cursorPos = e.target.selectionStart
    const textBeforeCursor = newContent.substring(0, cursorPos)
    const textAfterCursor = newContent.substring(cursorPos)

    // 마지막으로 열린 태그 찾기
    const lastOpenTag = textBeforeCursor.match(/<([^/][^>]*)>(?![^<]*<\/\1>)[^<]*$/)
    if (lastOpenTag) {
      const tagName = lastOpenTag[1].trim()
      const hasClosingTag = textAfterCursor.includes(`</${tagName}>`) || 
                           textBeforeCursor.includes(`</${tagName}>`)
      
      if (!hasClosingTag) {
        // 닫는 태그가 없으면 자동으로 추가
        const updatedContent = newContent + `</${tagName}>`
        setContent(updatedContent)
        
        // 커서 위치 유지
        setTimeout(() => {
          e.target.focus()
          e.target.setSelectionRange(cursorPos, cursorPos)
        }, 0)
      }
    }
  }

  // 색상 적용 함수
  const applyColor = () => {
    insertTag('색상', selectedColor)
  }

  // 소제목 토글 함수
  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // 컨텐츠 렌더링 함수
  const renderContent = () => {
    return content.split('\n').map((line, i) => (
      <div key={i} dangerouslySetInnerHTML={{
        __html: line
          .replace(/<어록>(.*?)<\/어록>/g, '『$1』')
          .replace(/<링크>(.*?)<\/링크>/g, (_, p1) => {
            // 링크가 https://로 시작하는 경우 외부 링크로 처리
            if (p1.startsWith('https://')) {
              return `<a href="${p1}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-600">→${p1}</a>`
            }
            // 그 외의 경우 내부 문서 링크로 처리
            return `<a href="/wiki/${encodeURIComponent(p1)}" class="text-blue-500 hover:text-blue-600">→${p1}</a>`
          })
          .replace(/<소제목>(.*?)<\/소제목>/g, '<h3 class="text-xl font-bold mt-6 mb-4">$1</h3>')
          .replace(/<취소선>(.*?)<\/취소선>/g, '<del>$1</del>')
          .replace(/<강조>(.*?)<\/강조>/g, '<strong>$1</strong>')
          .replace(/<빙글빙글>(.*?)<\/빙글빙글>/g, '<span class="inline-block animate-[spin_2s_linear_infinite]">$1</span>')
          .replace(/<사라지기>(.*?)<\/사라지기>/g, '<span class="fade-in-out">$1</span>')
          .replace(/<색상 color="(.*?)">(.*?)<\/색상>/g, '<span style="color: $1">$2</span>')
      }} />
    ))
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8081/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              signUp(
                signUpRequest: {
                  department: "컴퓨터공학과"
                  enteredYear: "2025-03-01"
                  name: "박현준"
                }
              ) {
                id
                email
                username
                department
                enteredYear
              }
            }
          `
        }),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      // 성공 시 처리
      alert('문서가 성공적으로 저장되었습니다.');
      router.push('/wiki'); // 위키 메인 페이지로 이동

    } catch (error) {
      console.error('Error:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-gray-900">
      {/* 뒤로가기 버튼 추가 */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          뒤로가기
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8 max-w-7xl mx-auto px-4 py-8">
        {/* 왼쪽: 입력 영역 */}
        <div>
          {/* 제목 입력 */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              className="w-full text-3xl font-bold text-gray-700 dark:text-gray-200 bg-transparent border-none outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 연도 필터 */}
          <div className="flex gap-4 mb-6">
            {[2025, 2024, 2023, 2022, 2021].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`${
                  selectedYear === year
                    ? 'text-blue-500 font-semibold'
                    : 'text-gray-600 dark:text-gray-300'
                } hover:text-blue-500`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* 카테고리 탭 */}
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              '사건/사고',
              '대학생활',
              '취업준비',
            ].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                } hover:bg-blue-500 hover:text-white`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 태그 버튼 모음 */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { name: '어록', icon: '『』', shortcut: 'Ctrl + -' },
              { name: '링크', icon: '→', shortcut: 'Ctrl + >' },
              { name: '소제목', icon: 'H', shortcut: 'Ctrl + H' },
              { name: '취소선', icon: 'S', shortcut: 'Ctrl + S' },
              { name: '강조', icon: 'B', shortcut: 'Ctrl + B' },
              { name: '빙글빙글', icon: '↻', shortcut: 'Ctrl + T' },
              { name: '사라지기', icon: 'X', shortcut: 'Ctrl + X' },
            ].map((tag) => (
              <button
                key={tag.name}
                onClick={() => insertTag(tag.name)}
                className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
                title={tag.shortcut}
              >
                <span className="mr-1">{tag.icon}</span>
                <span>{tag.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 block">{tag.shortcut}</span>
              </button>
            ))}
            {/* 색상 선택기와 확인 버튼 */}
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-8 h-8 cursor-pointer"
                title="텍스트 색상 선택"
              />
              <button
                onClick={() => insertTag('색상', selectedColor)}
                className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
              >
                색상 적용
              </button>
            </div>
          </div>

          {/* 문서 입력 안내 */}
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            문서 내용을 입력해주세요. 사진 또는 동영상을 넣으려면 파일을 드래그&드롭하세요.
          </p>

          {/* 내용 입력 */}
          <textarea
            placeholder="왼쪽 화살표 버튼을 누르면 태그를 사용할 수 있습니다"
            className="w-full h-[calc(100vh-500px)] p-4 mb-6 bg-gray-50 dark:bg-gray-800 
                     border border-gray-200 dark:border-gray-700 rounded-md resize-none 
                     font-mono text-sm"
            value={content}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />

          {/* 작성 버튼 */}
          <div className="flex justify-end">
            <button 
              onClick={handleSubmit} 
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              작성하기
            </button>
          </div>
        </div>

        {/* 오른쪽: 미리보기 영역 */}
        <div className="border-l border-gray-200 dark:border-gray-700 pl-8">
          <div className="sticky top-8">
            <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200 mb-8">
              {title || "제목을 입력해주세요"}
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              분류: {selectedCategory} | {selectedYear}년
            </div>
            <div className="prose dark:prose-invert max-w-none">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* 태그 자동완성 UI */}
      {showTagSuggestions && (
        <div
          className="fixed z-50 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700"
          style={{
            top: tagSuggestionPosition.top,
            left: tagSuggestionPosition.left,
            width: '264px', // 명시적 너비 설정
            maxHeight: '300px', // 최대 높이 설정
            overflowY: 'auto' // 내용이 많을 경우 스크롤 가능하도록
          }}
        >
          <ul className="py-2">
            {availableTags.map((tag) => (
              <li
                key={tag.name}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleTagSelect(tag.name)}
              >
                <div className="font-medium">{tag.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {tag.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default NewDocs