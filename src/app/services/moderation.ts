import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModerationService {

  constructor(
    private http: HttpClient
  ) { }

  async moderate(text:string){

  const body = {

    model: 'llama3.2:3b',

    stream: false,

    prompt: `
Tu tarea es clasificar texto.

Reglas:

- SAFE -> nombres deportivos normales
- SAFE -> ciudades
- SAFE -> clubes
- SAFE -> nombres de fantasía
- BLOCK -> insultos
- BLOCK -> odio
- BLOCK -> amenazas
- BLOCK -> sexual explícito
- BLOCK -> racismo

IMPORTANTE:

Responde UNA SOLA PALABRA.

SAFE
o
BLOCK

Texto:
"${text}"
`

  };

  const response:any =
    await firstValueFrom(

      this.http.post(
        'http://localhost:11434/api/generate',
        body
      )

    );

  const result =
    response.response
      ?.trim()
      ?.toUpperCase()
      ?.replace(/\n/g,'');

  console.log(
    "RAW:",
    response.response
  );

  console.log(
    "CLEAN:",
    result
  );

  return result;

}
}