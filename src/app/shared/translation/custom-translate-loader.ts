import { TranslateLoader } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
  public prefix = 'assets/i18n/';
  public suffix = '.json';

  constructor(private http: HttpClient) {}

  public getTranslation(lang: string): any {
    const filename = `${lang}`;
    return this.http.get(this.prefix + filename + this.suffix);
  }
}
