import { Injectable } from '@nestjs/common';
import { quotes } from './quotes';
import { randomInt } from 'crypto';

let new_quotes = JSON.parse(JSON.stringify(quotes))

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getQuotes() {
    return new_quotes
  }

  getRandomQuote() {
    let quote = new_quotes.quotes[randomInt(new_quotes.quotes.length - 1)]
    return quote
  }

  getTopAuthors() {
    let authorCount: { [key: string]: number } = {};
    new_quotes.quotes.forEach(quote => {
      if (authorCount[quote.author]) {
        authorCount[quote.author]++;
      } else {
        authorCount[quote.author] = 1;
      }
    });

    let sortedAuthors = Object.entries(authorCount).sort((a, b) => {
      return (b[1] as number) - (a[1] as number);
    });

    return {topA: sortedAuthors}
  }

  getQuotesById(id: string){
    let selected_quote = {}
    quotes.quotes.some(quote => {
      if(quote.id == Number(id)){
        selected_quote = quote
        return true
      }
      return false
    });
    return selected_quote
  }

  deleteQuote(id: string){
    let succeed = false
    quotes.quotes.some((quote, i) => {
      if(quote.id == Number(id)){
        quotes.quotes.splice(i, 1)
        succeed = true
        return true
      }
      return false
    });
    return succeed
  }
}
