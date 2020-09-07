export class SidebarView {
    constructor(optionClickedHandler) {
        this.optionClickHandler = optionClickedHandler;
    }

    sidebar = document.querySelector('.sidebar');

    sidebarOptionsList = document.querySelector('.sidebar__nav-list');

    showSidebar = () => {
        this.sidebar.style.visibility = 'visible';
    };

    hideSidebar = () => {
        this.sidebar.style.visibility = 'hidden';
    };

    renderOptions = (optionsConfig) => {
        this.sidebarOptionsList.innerHTML = optionsConfig.reduce((listItemsHTML, option) => `
              ${listItemsHTML}
              <li class="sidebar__nav-item" data-event="${option.publisherEvent}">
                <span class="sidebar__nav-label">${option.name}</span>
                <i class="sidebar__item-icon fas fa-${option.iconName}"></i>
              </li>
            `, '');

        [...this.sidebarOptionsList.children].forEach((optionElem) => {
            optionElem.addEventListener('click', this.optionClickHandler);
        });
    };

    removeOptions = () => {
        [...this.sidebarOptionsList.children].forEach((optionElem) => {
            optionElem.removeEventListener('click', this.optionClickHandler);
            optionElem.parentNode.removeChild(optionElem);
        });
    };
}
