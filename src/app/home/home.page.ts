import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  lampIcon: string = 'rose'
  lampColor: string = 'gray';
  apiUrl: string = environment.apiRepl;
  intervalid: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.startPolling();
  }

  ngOnDestroy() {
    if (this.intervalid) {
      clearInterval(this.intervalid);
    }
  }

  startPolling(){
    this.intervalid = setInterval(() => {
      this.getLampStatus();
    }, 5000);
  }

getLampStatus() {
  this.http.get<{ status: string, data: { command: string}[] }>(this.apiUrl).subscribe(response => {
    console.log('API response:', response);
  if (response.status === 'success' && response.data.length > 0) {
    const command = response.data[0].command;
    this.updateLampColor(command);
  }
},
error => {
  console.error('API error', error);
}
  );
}

  updateLampColor(command: string) {
    console.log('updateLampcolor called with command:', command);
    switch (command) {
      case 'Nyalakan Lampu Merah':
        this.lampColor = 'red';
        break;
      case 'Nyalakan Lampu Hijau':
        this.lampColor = 'green';
        break;
      case 'Nyalakan Lampu Biru':
        this.lampColor = 'blue';
        break;
        case 'Matikan Lampu':
      default:
        this.lampColor = 'gray';
        break;
    }
    console.log('Lamp color updated to:', this.lampColor);
  }
}
