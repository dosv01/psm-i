import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'psm-i-quiz';
  private _jsonURL = 'assets/perguntas.json';
  perguntas: any = [];
  values = Object.values;
  i: number = 0;
  scoreFinal = 0;
  finalizado = false;

  ngOnInit() {
  }

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      console.log(data);
      this.perguntas = this.shuffle(data);
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  public calcularRespostas() {
    let score = 0;
    this.scoreFinal = 0;
    this.perguntas.forEach(pergunta => {
      if (pergunta.resposta == pergunta.correta) {
        score++;
      }
    });
    
    if (score != 0) {
      this.scoreFinal = (score / this.perguntas.length)*100;
    }
    this.finalizado = true;
    // alert("Você acertou " + this.scoreFinal.toPrecision(2) + "% das questões.");
  }

  limpaRespostas() {
    this.perguntas.forEach(pergunta => {
      pergunta.correta == '';
    });
    this.finalizado = false;
    this.scoreFinal = 0;
  }

  shuffle(arra1) {
    let ctr = arra1.length;
    let temp;
    let index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

}