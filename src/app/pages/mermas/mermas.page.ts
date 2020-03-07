import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, Platform} from "@ionic/angular";
import {MermaService} from "../../providers/merma.service";
import {Merma, MermaMixed} from "../../models/merma.model";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-mermas',
  templateUrl: './mermas.page.html',
  styleUrls: ['./mermas.page.scss'],
})
export class MermasPage implements OnInit {
  mermas: MermaMixed[] = []
  defaultImage =  '../../assets/default.png'
  page = 1
  paginatedBy = 4
  maximumPage = 3

  constructor(
              private mermaService: MermaService,
              private router: Router,
              private platform: Platform,
              public loadingController: LoadingController) {

      //this.presentLoading('')
      this.platform.ready().then(res=>{
        this.loadMermas()
      })
  }

  loadMermas3(event?){
    this.mermaService.getMermas().then(mermas=>{
      if(!event){
        this.maximumPage = Math.ceil(mermas.length/this.paginatedBy)
      }
      this.mermas = mermas.slice(0, this.paginatedBy*this.page)
      if(event){
        event.target.complete()
      }
    })
  }

  loadMermas(){
    this.mermaService.getMermas().then(mermas=>{
      this.mermas = mermas
    })
  }


  loadMermas2(event?){
    this.mermaService.getMermas().then(mermas=>{

      function compare(a,b) {
        if (a.id > b.id)
          return -1;
        if (a.id < b.id)
          return 1;
        return 0;
      }

       mermas.sort(compare);
        this.mermas = mermas
    })
  }

 /* loadMore(event){
    if(this.page === this.maximumPage){
      event.target.disabled = true
    }else{
      this.page++
      this.loadMermas(event)
    }
  }*/

  ngOnInit() {

  }

  editMerma(id){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(id)
      }
    };
    this.router.navigate(['create'],  navigationExtras)
  }



  async presentLoading(message) {
    console.log('loading...')
    const loading = await this.loadingController.create({
      message: message,
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }




}
