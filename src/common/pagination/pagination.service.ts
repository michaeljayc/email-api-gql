import { Injectable } from "@nestjs/common";

@Injectable()
export class PaginationService {

    constructor(){}

    async pagination(data: any, page_number?: number): Promise<any> {
        
        const page = page_number ?? 1;
        const per_page = 2;
        const total_results = Object.keys(data).length;
        const current = page;
        const total_pages = Math.ceil(total_results/per_page);
        const trim_start = (page - 1) * per_page;
        const trim_end = trim_start + per_page;
        const page_lists = Array.isArray(data) ? 
            data.slice(trim_start, trim_end) :
            data;
        
        const paginated_data = {
            page_lists,
            total_pages: total_pages,
            current_page: current,
            previous_page: current !== 1 ? current - 1 : 0,
            next_page: current !== total_pages ? current + 1 : 0,
            per_page: per_page,
            total_results: total_results,
        };
        return paginated_data;
    }
}