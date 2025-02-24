'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const AdminPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedMenu, setSelectedMenu] = useState('posts');

  // URL의 tab 파라미터를 확인하여 초기 메뉴 설정
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setSelectedMenu(tab);
    }
  }, [searchParams]);

  const menuItems = [
    { id: 'dashboard', label: '대시보드' },
    { id: 'posts', label: '게시물 관리' },
    { id: 'chat', label: '가천CC 채팅 관리' },
    { id: 'forest', label: '대나무숲 관리' },
    { id: 'wiki', label: 'Wiki 관리' },
    { id: 'coding', label: '코딩테스트 관리' },
    { id: 'users', label: '사용자 관리' },
    { id: 'reports', label: '신고 관리' },
    { id: 'notices', label: '공지사항 관리' },
    { id: 'settings', label: '설정' },
    { id: 'logs', label: '로그 관리' },
  ];

  const handleMenuClick = (menuId: string) => {
    setSelectedMenu(menuId);
    // URL 변경 (페이지 이동 없이)
    router.push(`/admin?tab=${menuId}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">관리자 대시보드</h1>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="flex gap-6">
          {/* 사이드바 */}
          <div className="w-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <nav className="p-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full text-left px-4 py-2 rounded-md mb-2 ${
                    selectedMenu === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* 컨텐츠 영역 */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            {selectedMenu === 'dashboard' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">대시보드</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">총 방문자 수</h3>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">1,234</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-green-600 dark:text-green-400">오늘 새 게시물</h3>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">56</p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-yellow-600 dark:text-yellow-400">신규 가입자</h3>
                    <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">12</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-red-600 dark:text-red-400">미처리 신고</h3>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">8</p>
                  </div>
                </div>
              </div>
            )}

            {selectedMenu === 'users' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">사용자 관리</h2>
                <div className="space-y-4">
                  <div className="flex justify-between mb-4">
                    <input
                      type="text"
                      placeholder="사용자 검색..."
                      className="px-4 py-2 border dark:border-gray-700 rounded-md dark:bg-gray-900"
                    />
                    <select className="px-4 py-2 border dark:border-gray-700 rounded-md dark:bg-gray-900">
                      <option value="all">전체</option>
                      <option value="admin">관리자</option>
                      <option value="user">일반 사용자</option>
                      <option value="suspended">정지된 사용자</option>
                    </select>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">사용자</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">권한</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">가입일</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">상태</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">관리</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">사용자1</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">관리자</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">2024-01-01</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">활성</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-red-600 hover:text-red-800 mr-2">정지</button>
                          <button className="text-blue-600 hover:text-blue-800">수정</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedMenu === 'reports' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">신고 관리</h2>
                <div className="space-y-4">
                  <div className="flex justify-between mb-4">
                    <select className="px-4 py-2 border dark:border-gray-700 rounded-md dark:bg-gray-900">
                      <option value="all">전체 신고</option>
                      <option value="pending">미처리</option>
                      <option value="processed">처리완료</option>
                    </select>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">신고 대상</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">신고 사유</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">신고자</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">상태</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">관리</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">게시물 제목</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">부적절한 내용</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">신고자1</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">미처리</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-red-600 hover:text-red-800 mr-2">삭제</button>
                          <button className="text-green-600 hover:text-green-800">처리</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedMenu === 'notices' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">공지사항 관리</h2>
                <div className="space-y-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                    새 공지사항 작성
                  </button>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">제목</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">작성자</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">작성일</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">상태</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">관리</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">공지사항 제목</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">관리자</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">2024-01-01</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">고정</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-red-600 hover:text-red-800 mr-2">삭제</button>
                          <button className="text-blue-600 hover:text-blue-800">수정</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedMenu === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">설정</h2>
                <div className="space-y-6">
                  <div className="border dark:border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">사이트 설정</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          사이트 이름
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border dark:border-gray-700 rounded-md dark:bg-gray-900"
                          defaultValue="가천 유니버스"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          금지어 설정
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border dark:border-gray-700 rounded-md dark:bg-gray-900"
                          placeholder="금지어를 입력하세요 (쉼표로 구분)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMenu === 'logs' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">로그 관리</h2>
                <div className="space-y-4">
                  <div className="flex justify-between mb-4">
                    <select className="px-4 py-2 border dark:border-gray-700 rounded-md dark:bg-gray-900">
                      <option value="all">전체 로그</option>
                      <option value="admin">관리자 활동</option>
                      <option value="error">에러 로그</option>
                      <option value="access">접속 기록</option>
                    </select>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">시간</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">유형</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">내용</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">IP</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">2024-01-01 12:00:00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">관리자 활동</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">게시물 삭제</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">127.0.0.1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedMenu === 'posts' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">게시물 관리</h2>
                <div className="space-y-4">
                  {/* 게시물 목록 */}
                  <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">제목</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">작성자</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">작성일</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">관리</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {/* 샘플 데이터 */}
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">게시물 제목</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">작성자</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">2024-01-01</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="text-red-600 hover:text-red-800 mr-2">삭제</button>
                            <button className="text-blue-600 hover:text-blue-800">수정</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {selectedMenu === 'chat' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">가천CC 채팅 관리</h2>
                <div className="space-y-4">
                  {/* 채팅 관리 컨텐츠 */}
                  <div className="border dark:border-gray-700 p-4 rounded-lg">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        채팅방 필터링 단어 관리
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border dark:border-gray-700 rounded-md dark:bg-gray-900"
                        placeholder="필터링할 단어 추가"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMenu === 'forest' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">대나무숲 관리</h2>
                <div className="space-y-4">
                  {/* 대나무숲 게시물 관리 */}
                  <div className="border dark:border-gray-700 rounded-lg p-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">신고된 게시물</h3>
                      {/* 신고 목록 */}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMenu === 'wiki' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Wiki 관리</h2>
                <div className="space-y-4">
                  {/* Wiki 문서 관리 */}
                  <div className="border dark:border-gray-700 rounded-lg p-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">최근 수정된 문서</h3>
                      {/* 문서 목록 */}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMenu === 'coding' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">코딩테스트 관리</h2>
                <div className="space-y-4">
                  {/* 문제 생성 폼 */}
                  <div className="border dark:border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">새 문제 만들기</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          문제 제목
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border dark:border-gray-700 rounded-md dark:bg-gray-900"
                          placeholder="문제 제목을 입력하세요"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          문제 설명
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border dark:border-gray-700 rounded-md dark:bg-gray-900 h-32"
                          placeholder="문제 설명을 입력하세요"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          입력 예시
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border dark:border-gray-700 rounded-md dark:bg-gray-900"
                          placeholder="입력 예시를 입력하세요"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          출력 예시
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border dark:border-gray-700 rounded-md dark:bg-gray-900"
                          placeholder="출력 예시를 입력하세요"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          제한 사항
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border dark:border-gray-700 rounded-md dark:bg-gray-900"
                          placeholder="제한 사항을 입력하세요"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          난이도
                        </label>
                        <select className="w-full px-3 py-2 border dark:border-gray-700 rounded-md dark:bg-gray-900">
                          <option value="easy">쉬움</option>
                          <option value="medium">보통</option>
                          <option value="hard">어려움</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                      >
                        문제 등록
                      </button>
                    </form>
                  </div>

                  {/* 문제 목록 */}
                  <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">제목</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">난이도</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">등록일</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">관리</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">두 수의 합</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              쉬움
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">2024-01-01</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="text-red-600 hover:text-red-800 mr-2">삭제</button>
                            <button className="text-blue-600 hover:text-blue-800">수정</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
