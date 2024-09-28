import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get("/quotes")
  @Render('quotes')
  getQuotes() {
    return this.appService.getQuotes()
  }

  @Get("/randomQuote")
  @Render('randomQuote')
  getRandomQuote() {
    return this.appService.getRandomQuote()
  }

  @Get("/topAuthors")
  @Render('topAuthors')
  getTopAuthors() {
    return this.appService.getTopAuthors()
  }

  @Get('quotes/:id')
  @Render('randomQuote')
  oneQuote(@Param('id') id: string) {
    return this.appService.getQuotesById(id)
  }

  @Get('deleteQuote/:id')
  deleteQuote(@Param('id') id: string) {
    let deleteQuote = this.appService.deleteQuote(id)
    return (deleteQuote ? "Sikeres törlés" : "Ismeretlen idézet")
  }

  @Get('search')
  @Render('search')
  search(@Query() query) {
    return this.appService.search(query?.text)
  }

  @Get('authorRandomForm')
  @Render('authorRandomForm')
  authorRandomForm() {}

  
  @Get('authorRandom')
  @Render('authorRandom')
  authorRandom(@Query() query) {
    return this.appService.authorRandom(query?.author)
  }
}
