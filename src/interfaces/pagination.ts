export interface IPaginationResponse {
    total_pages: number;
    current_page?: number;
    previous_page: number;
    next_page: number;
    per_page: number;
}