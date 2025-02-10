import { College } from '@/types/college';
import { printStyles } from '@/styles/print';

export const printCollege = (college: College) => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
        printWindow.document.body.innerHTML = `
            <html>
                <head>
                    <title>${college.title} 정보</title>
                    <style>${printStyles}</style>
                </head>
                <body>
                    <h1>${college.title}</h1>
                    <div class="description">${college.description}</div>
                    
                    <h2>소속학과</h2>
                    <div class="department-list">
                        ${college.departments.map(d => 
                            `<div class="department-item">• ${d.name}</div>`
                        ).join('')}
                    </div>
                    
                    ${college.details?.map(d => `
                        <div class="detail-section">
                            <h2>${d.title}</h2>
                            ${d.items.map(item => 
                                `<div class="detail-item">${item}</div>`
                            ).join('')}
                        </div>
                    `).join('')}
                </body>
            </html>
        `;
        printWindow.document.close();
        printWindow.print();
    }
}; 