import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [
    NgIf,
    NgForOf
  ]
})
export class CalendarComponent {
  allNews: any[] = [];
  filteredNews: any[] = [];
  currentPage: number = 1;
  pageSize: number = 12;

  constructor(private apiService: ApiService) {}

  onDateChange(event: any) {
    const date = event.target.value;
    this.apiService.getNewsByDate(date).subscribe((response) => {
      this.allNews = response || [];
      this.currentPage = 1; // Reset to first page
      this.updatePagination();
    });
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredNews = this.allNews.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.allNews.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
