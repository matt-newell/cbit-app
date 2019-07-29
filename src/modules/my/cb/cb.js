import { LightningElement, wire, api } from 'lwc';
import company from 'my/cbCompany';

export default class HelloWorldTwo extends LightningElement {
    @api domain;

    @wire(company, { domain: '$domain' })
    companyData = '';

    failedImg() {
        this.companyData.logo = 'https://logo.clearbit.com/clearbit.com';
    }

    get company() {
        if (this.companyData) {
            // eslint-disable-next-line no-console
            console.log('companyData', this.companyData);
            return `Name: ${this.companyData.name} Domain: ${this.companyData.domain}`;
        }
        return 'Loading...';
    }

    get employees() {
        if (this.companyData.metrics) {
            // This could be internationalized with little effor
            return new Intl.NumberFormat('en-US', {
                maximumSignificantDigits: 3
            }).format(this.companyData.metrics.employees);
        }
        return 'Loading...';
    }
}
