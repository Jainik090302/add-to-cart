import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  public productList: any;
  public filterCategory: any;
  public searchKey: string = ''
  constructor(private apiService: ApiService, private cartService: CartService) { }
  ngOnInit() {
    this.apiService.getProduct().subscribe(res => {
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a: any) => {
        if (a.category === "women's clothing" || a.category === "men's clothing") {
          a.category = "fashion"
        }
        Object.assign(a, { quantity: 1, total: a.price });
      });
      console.log(this.productList);
    })
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }
  addToCart(item: any) {
    this.cartService.addToCart(item);
  }
  filter(category: string) {
    this.filterCategory = this.productList
      .filter((a: any) => {
        if (a.category == category || category == '') {
          return a;
        }
      })
  }
}
