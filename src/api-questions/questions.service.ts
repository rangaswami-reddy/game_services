import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class QuestionsService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(
    limit?: number,
    page?: number,
    grade?: number,
    subjects?: number,
    chapters?: number,
    question_type?: number,
  ): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          process.env.QUESTION_BANK_BASE_URL +
            `/questions?limit=${limit}&page=${page}&grade=${grade}&subjects=${subjects}&chapters=${chapters}&question_type=${question_type}&sortBy=-1`,
        )
        .pipe(
          catchError(() => {
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async questionById(id: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(process.env.QUESTION_BANK_BASE_URL + `/questions?uuid=${id}`)
        .pipe(
          catchError(() => {
            throw 'An error happened!';
          }),
        ),
    );
    return {
      uuid: data.results[0].uuid,
      question: data.results[0].question,
      options: data.results[0].options,
      answer: data.results[0].answers,
      duration: data.results[0].duration,
      images: data.results[0].images,
    };
  }

  async assetNamebyID(id: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(process.env.BASE_URL + '/assetNamebyID/' + id).pipe(
        catchError(() => {
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async curriculum(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(process.env.BASE_URL + '/curriculum').pipe(
        catchError(() => {
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async grades(id: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(process.env.BASE_URL + '/grades/' + id).pipe(
        catchError(() => {
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async subjects(id: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(process.env.BASE_URL + '/subjects/' + id).pipe(
        catchError(() => {
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async topics(id: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(process.env.BASE_URL + '/topics/' + id).pipe(
        catchError(() => {
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async subTopics(id: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(process.env.BASE_URL + '/sub-topics/' + id).pipe(
        catchError(() => {
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}
