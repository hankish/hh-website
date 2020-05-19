export class LitScrollListener {

  constructor(
    scrollingElement, // set this the parent element to listen for scrolls
    scrollItems, // pass an array of objects representing the scrollable items
    scrollItemIdKey = 'key', // which key in the scrollItems should be used to find DOM element
    idSearchPrefix = '#', // prefixed to key when searching querySelector(prefix+key)
    scrollItemSelectedKey = 'selected', // which key to add boolean indicating scroll selection
  ) {
    this.position = 0.0;
    this.activeIndex = 0;
    this.scrollingElement = scrollingElement;
    this.scrollItemIdKey = scrollItemIdKey;
    this.idSearchPrefix = idSearchPrefix;
    this.scrollItemSelectedKey = scrollItemSelectedKey;
    this.scrollItems = scrollItems;

    this.rebuildScrollItems();
    this._fireScrollItemsChanged();
    this.recalculateOffsetTops();

    this.scrollingElement.addEventListener('scroll', (e) => this.scrollEvent(e));
  }

  unregister() {
    this.scrollingElement.removeEventListener('scroll', this.scrollEvent);
  }

  rebuildScrollItems() {
    this.scrollItems = this.scrollItems.map((item, index) => {
      const newItem = {...item };
      newItem[this.scrollItemSelectedKey] = (index === this.activeIndex);
      return newItem;
    });
  }

  recalculateOffsetTops() {
    this.offsetTops = this.scrollItems.map(item => {
      const element = this.scrollingElement.querySelector(
        this.idSearchPrefix + item[this.scrollItemIdKey]
      );

      return element ? element.offsetTop : -1;
    });
  }
  
  scrollEvent(e) {
    const [scrollTop, scrollHeight, offsetHeight] = [
      this.scrollingElement.scrollTop, 
      this.scrollingElement.scrollHeight, 
      this.scrollingElement.offsetHeight
    ];
    let newActiveIndex = 0;

    if (scrollTop < 50) {
      // We're at the top, so select the first item no matter what
      newActiveIndex = 0;
    } else if ((scrollTop + 50 + offsetHeight) > scrollHeight) {
      // We're at the bottom, so select the last item no matter what
      newActiveIndex = this.scrollItems.length - 1;
    } else {
      // We're somewhere in the middle so we need to actually run the calculations.
      // We activate a particular item when it is in the bottom 40% of the scrolling element.
      const activeOffsetTop = scrollTop + (offsetHeight * 0.4);
      
      // Find the highest index which is above the active scroll offset
      this.offsetTops.forEach((offsetTop, index) => {
        newActiveIndex = (activeOffsetTop > offsetTop) ? index : newActiveIndex;
      });
    }

    if (newActiveIndex !== this.activeIndex) {
      this.activeIndex = newActiveIndex;
      this.rebuildScrollItems();
      this._fireScrollItemsChanged();
    }
  }

  _fireScrollItemsChanged() {
    this.scrollingElement.dispatchEvent(new CustomEvent('scroll-items-changed', {
      detail: { scrollItems: this.scrollItems }
    }));
  }

}