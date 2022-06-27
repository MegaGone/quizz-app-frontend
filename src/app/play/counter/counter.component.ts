import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  public counter: number;
  public setInterval!: ReturnType<typeof setTimeout>;

  @Output() public counterStatus: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor() { 
    this.counter = 5;
  }

  ngOnInit(): void {
    this.initCounter();
  }

  /**
   * INIT THE COUNTER
   */
  initCounter() {
    this.setInterval = setInterval(() => {
      
      this.counter -= 1
      if (this.counter === 0) {
        clearInterval(this.setInterval);
        this.sendCounterStatus();
      }

    }, 1000)
  }

  sendCounterStatus() {
    this.counterStatus.emit(true);    
  }
  
}
