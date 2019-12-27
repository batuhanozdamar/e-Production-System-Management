import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// @ts-ignore
import {BaseChartDirective, Label} from 'ng2-charts';
import {ApiService} from "../../shared/services/api.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit {



    newOrderCount: number=0;
    myOfferCount: number=0;
    acceptedOffer: number=0;
    rejectedOffer: number=0;



    chSoldProductLoaded=false;
    chSoldProductLoadedP=false;


    public productDistData:any = {
        data : [],
        labels: [],
        list: []
    };

    public productDistDataP:any = {
        data : [],
        labels: [],
        list: []
    };

    //category: number=0;

    constructor(private http: HttpClient) {

    }

    ngOnInit(): void {
        this.refreshPage();
    }

    refreshPage(){
        this.refreshNewOrferCount();
        this.refreshmyOfferCount();
        this.refreshMyRejectedOffer();
        this.refreshMyAcceptedOffer();

    }

    refreshNewOrferCount(){

        var currentUserStr = localStorage.getItem("currentUser");
        if (currentUserStr != null && currentUserStr != "") {
            var currentUser= JSON.parse(currentUserStr);
        }

        this.http.get<ApiService>('http://localhost:8000/api/offer/getOffers?productCompanyId=' + currentUser.company.id + '&statusId=2').subscribe(
            data => {
                // @ts-ignore
                this.newOrderCount = data.length;
            })
    }

    refreshmyOfferCount(){
        var currentUserStr = localStorage.getItem("currentUser");
        if (currentUserStr != null && currentUserStr != "") {
            var currentUser= JSON.parse(currentUserStr);
        }

        this.http.get<ApiService>('http://localhost:8000/api/offer/getOffers?offerCompanyId=' + currentUser.company.id + '&statusId=2').subscribe(
            data => {
                // @ts-ignore
                this.myOfferCount = data.length;
            })
    }

    refreshMyAcceptedOffer(){
        var currentUserStr = localStorage.getItem("currentUser");
        if (currentUserStr != null && currentUserStr != "") {
            var currentUser= JSON.parse(currentUserStr);
        }

        this.http.get<ApiService>('http://localhost:8000/api/offer/getOffers?offerCompanyId=' + currentUser.company.id + '&statusId=3').subscribe(
            data => {
                // @ts-ignore
                this.acceptedOffer = data.length;
            })
    }

    refreshMyRejectedOffer(){
        var currentUserStr = localStorage.getItem("currentUser");
        if (currentUserStr != null && currentUserStr != "") {
            var currentUser= JSON.parse(currentUserStr);
        }

        this.http.get<ApiService>('http://localhost:8000/api/offer/getOffers?offerCompanyId=' + currentUser.company.id + '&statusId=4').subscribe(
            data => {
                // @ts-ignore
                this.rejectedOffer = data.length;
            })
    }

    refreshMyProductAmount(){
        var currentUserStr = localStorage.getItem("currentUser");
        if (currentUserStr != null && currentUserStr != "") {
            var currentUser= JSON.parse(currentUserStr);
        }

        this.http.get<ApiService>('http://localhost:8000/api/offer/getOffers?productCompanyId=' + currentUser.company.id + '&statusId=3').subscribe(
            data => {

                this.productDistData.list = data;
                var labels : Label[] = [];
                this.productDistData.labels = labels;
                this.productDistData.data = [];
                for (var i = 0; i< this.productDistData.list.length; i++) {
                    var productName = this.productDistData.list[i].companyProductDto.product.productName;
                    var foundedIndex = this.productDistData.labels.indexOf(productName);
                    if(foundedIndex>=0) {
                        this.productDistData.data[foundedIndex] += this.productDistData.list[i].askedAmount;
                    }else {
                        labels.push(productName);
                        this.productDistData.labels = labels;
                        this.productDistData.data.push(this.productDistData.list[i].askedAmount);
                    }
                }

                console.log(this.productDistData);
                this.chSoldProductLoaded = true;
               // this.chSoldProduct.chart.update();
            });

    }

    refreshMyPurchasedAmount(){

        var currentUserStr = localStorage.getItem("currentUser");
        if (currentUserStr != null && currentUserStr != "") {
            var currentUser= JSON.parse(currentUserStr);
        }

        this.http.get<ApiService>('http://localhost:8000/api/offer/getOffers?offerCompanyId=' + currentUser.company.id + '&statusId=3').subscribe(
            data => {

                this.productDistDataP.list = data;
                var labels : Label[] = [];
                this.productDistDataP.labels = labels;
                this.productDistDataP.data = [];
                for (var i = 0; i< this.productDistDataP.list.length; i++) {
                    var productName = this.productDistDataP.list[i].companyProductDto.product.productName;
                    var foundedIndex = this.productDistDataP.labels.indexOf(productName);
                    if(foundedIndex>=0) {
                        this.productDistDataP.data[foundedIndex] += this.productDistDataP.list[i].askedAmount;
                    }else {
                        labels.push(productName);
                        this.productDistDataP.labels = labels;
                        this.productDistDataP.data.push(this.productDistDataP.list[i].askedAmount);
                    }
                }

                console.log(this.productDistDataP);
                this.chSoldProductLoadedP = true;
                // this.chSoldProduct.chart.update();
            });

    }

    ngAfterViewInit(): void {
        this.refreshMyProductAmount();
        this.refreshMyPurchasedAmount();
    }









//--------------------------------------------------------------------------------------------------------------------------------

    //Bar Graph
    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        }
    };
    public barChartLabels: Label[] = ['2013', '2014', '2015', '2016', '2017', '2018', '2019'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    //public barChartPlugins = [pluginDataLabels];

    public barChartData: ChartDataSets[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Product 1' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Product 2' },
        { data: [48, 68, 30, 69, 76, 37, 70], label: 'Product 3' },
        { data: [18, 28, 50, 79, 36, 57, 60], label: 'Product 4' }
    ];

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40];
        this.barChartData[0].data = data;
    }





// ---------------------------------------------------------------------------------------


    // Pie
    public pieChartOptions: ChartOptions = {
        responsive: true,
        legend: {
            position: 'top',
        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    return label;
                },
            },
        }
    };
    public pieChartLabels: Label[] = ['Product 1', 'Product 2', 'Product 3', 'Product 4'];
    public pieChartData: number[] = [300, 400, 100, 200];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    // public pieChartPlugins = [pluginDataLabels];
    public pieChartColors = [
        {
            backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
        },
    ];


    /*changeLabels() {
        const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
            'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
            'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
            'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
            'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
        const randomWord = () => words[Math.trunc(Math.random() * words.length)];
        this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
    }

    addSlice() {
        this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
        this.pieChartData.push(400);
        this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
    }

    removeSlice() {
        this.pieChartLabels.pop();
        this.pieChartData.pop();
        this.pieChartColors[0].backgroundColor.pop();
    }

    changeLegendPosition() {
        this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
    }*/
}
