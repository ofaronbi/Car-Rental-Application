export class Slider {
    private slide: number[] = [];
    private first: number = 0;
    private second: number = 1;
    private third: number = 2;
    private previous: number = 3;
    public carSize!: number;
    
  
    private valueSubscribers: Function[] = [];
  
    constructor() {
      // Populate the slide
      this.populateSlide(this.carSize);
  
      // Schedule a task to update the slide and send the first number every 3 seconds
      setInterval(() => {
        this.updateSlide();
        // Emit the current values to subscribers
        this.emitValues();
        this.addToSlide(1);
      }, 3000);
    }
  
    // Method to subscribe to value updates
    subscribeToValues(callback: Function) {
      this.valueSubscribers.push(callback);
    }
  
    // Method to emit current values to subscribers
    private emitValues() {
      const values = {
        first: this.first,
        second: this.second,
        third: this.third,
        previous: this.previous
      };
      this.valueSubscribers.forEach(subscriber => {
        subscriber(values);
      });
    }
  
    private populateSlide(size: number): void {
      this.slide = []; // Clear the slide before populating it
      this.addToSlide(size);
    }
  
    private updateSlide(): void {
      if (this.slide?.length > 0) {
        // Remove the second number
        this.previous = this.first;
        this.first = this.second;
        this.second = this.third;
        this.third = this.slide.shift()!; // Remove the third number
      }
    }
  
    private addToSlide(size: number): void {
      for (let i = 0; i < size; i++) {
        let number = this.randomNumber();
        while (this.slide.includes(number)) { // Ensure no duplicates
          number = this.randomNumber();
        }
        this.slide.push(number);
      }
    }
  
    private randomNumber(): number {
       return Math.floor(Math.random() * this.carSize);
    }
  }
  