"use client"

import { useSignUpMutation } from '@/generated/graphql';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function StudentForm() {
    const router = useRouter();
    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const userName = localStorage.getItem('userName');
        !userName ? router.push('/login') : setName(userName);
    }, []);

    const [signUp, { loading, error }] = useSignUpMutation({
        onCompleted: (data) => {
            console.log('SignUp successful:', data.signUp);
            if (data.signUp?.username) {
                localStorage.setItem('userName', data.signUp.username);
                alert('회원가입이 완료되었습니다.');
                router.push('/');
            }
        },
        onError: (error) => {
            console.error('SignUp error:', error);
            alert('회원가입 중 오류가 발생했습니다: ' + error.message);
        }
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submitting form with data:', { department, year, name });

        try {
            const result = await signUp({
                variables: {
                    signUpRequest: {
                        department,
                        enteredYear: year,
                        name
                    }
                },
                context: {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            });

            if (result.data?.signUp) {
                localStorage.setItem('userName', result.data.signUp.username);
            }

        } catch (err) {
            console.error('Error during signup:', err);
        }
    };

    if (!name) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">회원가입</h1>
                
                <div className="mb-6 w-full">
                    <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        학과
                    </label>
                    <input
                        type="text"
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                        className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                        placeholder="학과를 입력하세요"
                    />
                </div>

                <div className="mb-6 w-full">
                    <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        입학년도
                    </label>
                    <input
                        type="date"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                        className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                    />
                </div>

                <div className="mb-6 w-full">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        이름
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                        placeholder="이름을 입력하세요"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full p-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium disabled:bg-gray-400"
                >
                    {loading ? '처리중...' : '회원가입'}
                </button>

                {error && (
                    <p className="mt-4 text-sm text-red-500">
                        {error.message}
                    </p>
                )}
            </form>
        </div>
    );
}

export default StudentForm;
