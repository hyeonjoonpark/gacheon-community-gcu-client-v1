import React from 'react';
import { motion } from 'framer-motion';
import { College } from '../types/college';

interface CollegeCardProps {
    college: College;
    index: number;
}

export default function CollegeCard({ college, index }: CollegeCardProps) {
    return (
        <motion.div className="...">
            {/* ... 기존 내용 유지 ... */}
            
            {college.departments.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        소속학과
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {college.departments.map((dept, idx) => (
                            <span 
                                key={idx}
                                className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                            >
                                {dept.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            
            {/* ... 기존 details 표시 부분 유지 ... */}
        </motion.div>
    );
} 