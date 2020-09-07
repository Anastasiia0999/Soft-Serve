import { sidebarOptionsConfig } from '../../config/sidebarOptionsConfig.js';

export class SidebarModel {
    getOptionsConfig = () => sidebarOptionsConfig;

    getUserRole = () => {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        return user.role;
    };
}
