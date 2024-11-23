import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html'
})
export class CardComponent implements AfterViewInit {
  @Input()
  public resource: any;

  public isLoading = true;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.http
      .get(`http://localhost:8080/image?fileName=${this.resource.image}`, {
        responseType: 'blob',
      })
      .subscribe(
        (blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.resource.image = reader.result;
            this.isLoading = false;
          };
          reader.readAsDataURL(blob);
        }
      );
  }
}
