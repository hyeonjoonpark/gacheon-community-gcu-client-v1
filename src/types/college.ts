export interface CollegeDetail {
    title: string;
    items: string[];
}

export interface Department {
    name: string;
    link?: string;
}

export interface College {
    title: string;
    description: string;
    icon: string;
    departments: Department[];
    details?: CollegeDetail[];
} 