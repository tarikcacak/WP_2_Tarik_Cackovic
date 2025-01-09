import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  imports: [
    NgForOf,
    NgIf,
  ],
})
export class NewsComponent implements OnInit {
  categories = ['Politics', 'Business', 'Auto', 'Sports'];
  news: { [key: string]: any[] } = {};
  currentPage: { [key: string]: number } = {};
  hasMoreNews: { [key: string]: boolean } = {};
  selectedCategory: string = this.categories[0];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.categories.forEach((category) => {
      this.news[category] = [];
      this.currentPage[category] = 1;
      this.hasMoreNews[category] = true;
    });
    this.loadNews(this.selectedCategory, true);
  }

  loadNews(category: string, reset: boolean = false): void {
    if (reset) {
      this.selectedCategory = category;
      this.news[category] = [];
      this.currentPage[category] = 1;
      this.hasMoreNews[category] = true;
    }

    const currentPage = this.currentPage[category];
    this.apiService.getNews(category, currentPage, 12).subscribe((response) => {
      if (response && response.length > 0) {
        this.news[category] = [...this.news[category], ...response];
        this.currentPage[category]++;
        if (response.length < 12) {
          this.hasMoreNews[category] = false;
        }
      } else {
        this.hasMoreNews[category] = false;
      }
    });
  }
}
