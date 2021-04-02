export default class NotificationMessage {

  static activePopup;
  
  constructor(message,{
    type = '',
    duration = 0,
  } = {}) {
    this.message = message;
    this.type = type;
    this.duration = duration; 
    this.render();
  }

  

  show(popupContainer = document.body){
    popupContainer.append(this.element);
    setTimeout( ()=> this.remove(),this.duration);
  }

  render() {
    if (NotificationMessage.activePopup) {
      NotificationMessage.activePopup.remove(); 
    }
    const element = document.createElement('div');
    element.innerHTML = `
    <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
    </div>
    `;

    this.element = element.firstElementChild;
    NotificationMessage.activePopup = this.element;
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
