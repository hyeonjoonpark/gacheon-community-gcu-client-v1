export const printStyles = `
    body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 800px;
        margin: 0 auto;
        padding: 40px;
    }
    h1 {
        color: #1a56db;
        font-size: 28px;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #e5e7eb;
    }
    h2 {
        color: #2563eb;
        font-size: 20px;
        margin-top: 30px;
        margin-bottom: 15px;
    }
    .description {
        font-size: 16px;
        color: #4b5563;
        margin-bottom: 30px;
    }
    .department-list {
        background: #f3f4f6;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 30px;
    }
    .department-item {
        margin: 8px 0;
        color: #1f2937;
    }
    .detail-section {
        margin-bottom: 25px;
    }
    .detail-item {
        margin: 8px 0;
        padding-left: 20px;
        position: relative;
    }
    .detail-item:before {
        content: "•";
        position: absolute;
        left: 0;
        color: #2563eb;
    }
    @media print {
        body {
            padding: 20px;
        }
    }
`; 