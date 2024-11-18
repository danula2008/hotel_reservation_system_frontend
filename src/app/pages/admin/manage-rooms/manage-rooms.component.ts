import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../../model/Room';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { PopupCardComponent } from "../../../common/popup-card/popup-card.component";
import { FormsModule } from '@angular/forms';
import LZUTF8 from 'lzutf8';

@Component({
  selector: 'app-manage-rooms',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, PopupCardComponent, FormsModule],
  templateUrl: './manage-rooms.component.html'
})
export class ManageRoomsComponent {
  loading = true
  roomList: Room[] = [];
  permenentRoomList: Room[] = [];
  selectedRoom: Room | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  searchTxt = ''
  availableFiler = "All"
  ratingFiler = "All"

  newRoom: Room = new Room('', '', '', '', 0, '', 0, '', '', false, false, '', 0, false);

  constructor(private http: HttpClient) {
    this.loadRooms();
  }

  loadRooms() {
    this.http.get<Room[]>("http://localhost:8080/room/get/all").subscribe(data => {
      data.forEach(obj => {
        console.log(obj)
        this.loading = false
        this.roomList.push(obj);
        this.permenentRoomList.push(obj);
      })
    })
  }

  setAvailabilityFilter(filter: string) {
    this.availableFiler = filter;

    if (this.availableFiler === 'Available') {
      this.roomList = this.permenentRoomList.filter(room => room.available === true);
    } else if (this.availableFiler === 'Not Available') {
      this.roomList = this.permenentRoomList.filter(room => room.available === false);
    } else {
      this.roomList = [...this.permenentRoomList];
    }
  }

  setRatingFilter(filter: string) {
    this.ratingFiler = filter;

    if (this.ratingFiler === 'All') {
      this.roomList = [...this.permenentRoomList];
    } else {
      const ratingValue = parseInt(this.ratingFiler.split(' ')[0], 10);
      this.roomList = this.permenentRoomList.filter(room => room.rating === ratingValue);
    }
  }

  searchTextFilter() {
    this.roomList = this.permenentRoomList.filter(room => room.name.toLowerCase().startsWith(this.searchTxt.toLowerCase()) || room.id.toLowerCase().includes(this.searchTxt.toLowerCase()))
  }

  showModel(room: Room) {
    this.selectedRoom = room;
  }

  editRoom(room: Room) {
    this.selectedRoom = null;
    console.log(room);
  }

  deleteRoom(room: Room) {
    console.log(room);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        // const base64String = reader.result as string;
        // this.newRoom.image = LZUTF8.compress(base64String);        
        // this.imagePreview = base64String;
      };

      reader.readAsDataURL(file);
    }    
  }

  removeImage(): void {
    this.imagePreview = null;
    this.newRoom.image = '';
  }

  addRoom(){
    // this.http.post("http://localhost:8080/room", this.newRoom).subscribe(data => {
    //   console.log(data)
    // })
  }
}
