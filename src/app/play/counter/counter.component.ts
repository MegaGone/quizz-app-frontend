import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styles: [
  ]
})
export class CounterComponent implements OnInit {

  public counter: number;
  public setInterval!: ReturnType<typeof setTimeout>;

  constructor() { 
    this.counter = 6;
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
        clearInterval(this.setInterval)
      }

    }, 1000)
  }
}
