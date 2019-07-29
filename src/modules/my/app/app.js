import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track
    showCompanies = false;

    @track
    allCompanies = false;

    handleCompanies() {
        this.showCompanies = !this.showCompanies;
    }

    handleAllCompanies() {
        this.allCompanies = !this.allCompanies;
    }
}
