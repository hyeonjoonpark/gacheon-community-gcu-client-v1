export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center gap-8">
        <h5 className="text-6xl font-bold text-gray-900 dark:text-white">404</h5>
        <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-700" />
        <p className="text-2xl text-gray-900 dark:text-white">
          찾을 수 없는 페이지 입니다
        </p>
      </div>
    </div>
  )
} 