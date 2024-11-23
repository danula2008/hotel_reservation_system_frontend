import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  Chart,
  BarController,
  LineController,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [NgIf, NgClass, NgFor],
  templateUrl: './overview.component.html'
})
export class OverviewComponent {
  constructor(private http: HttpClient) {
    let user = localStorage.getItem('user')
    if (user) {
      this.usersName = JSON.parse(user).name
    }
    this.getStats()
  }

  usersName = ''
  showLoader = true
  stats: any;

  async getStats() {
    const data = await this.http.get("http://localhost:8080/stats").toPromise();
    this.stats = data;
    this.showLoader = false
    // Register necessary Chart.js components
    Chart.register(
      BarController,
      LineController,
      BarElement,
      PointElement,
      LineElement,
      CategoryScale,
      LinearScale,
      Tooltip,
      Legend
    );

    this.createBarChart();
    this.createLineChart();
  }

  barChart: any;
  lineChart: any;

  createBarChart(): void {
    const canvas = document.getElementById('bar-chart') as HTMLCanvasElement;

    if (canvas) {
      this.barChart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`),
          datasets: [
            {
              label: 'Room Reservations',
              data: this.stats.roomReservationsInMonthRange,
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Hall Reservations',
              data: this.stats.hallReservationsInMonthRange,
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            },
            {
              label: 'Day Out Package Reservations',
              data: this.stats.dopReservationsInMonthRange,
              backgroundColor: 'rgba(153, 102, 255, 0.7)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  return `${context.dataset.label}: ${context.raw}`;
                }
              }
            },
            legend: {
              position: 'top'
            }
          },
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true,
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    } else {
      console.error('Bar chart canvas element not found');
    }
  }
  

  createLineChart(): void {
    const canvas = document.getElementById('line-chart') as HTMLCanvasElement;

    if (canvas) {
      this.lineChart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`),
          datasets: [
            {
              label: 'Room Reservations',
              data: this.stats.roomReservationsInMonthRange,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'Hall Reservations',
              data: this.stats.hallReservationsInMonthRange,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'Day Out Package Reservations',
              data: this.stats.dopReservationsInMonthRange,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              fill: true,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  return `${context.dataset.label}: ${context.raw}`;
                }
              }
            },
            legend: {
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    } else {
      console.error('Line chart canvas element not found');
    }
  }

}
