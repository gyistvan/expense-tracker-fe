import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

export interface Language {
  code: string;
  title: string;
}

const AVAILABLE_LANGUAGES = [
  {
    code: 'en',
    title: 'SHARED_COMPONENTS.LANGUAGE_SELECTOR.LANGUAGES.ENGLISH_TITLE',
  },
  {
    code: 'hu',
    title: 'SHARED_COMPONENTS.LANGUAGE_SELECTOR.LANGUAGES.HUNGARIAN_TITLE',
  },
];

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css'],
})
export class LanguageSelectorComponent implements OnInit {
  public languages: Language[] = AVAILABLE_LANGUAGES;
  public selectedLanguage: Language = AVAILABLE_LANGUAGES[0];
  public isLanguageSelectorOpen: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private translateService: TranslateService
  ) {
    translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
    let selectedLanguage = this.localStorageService.getToken(
      'app-selected-language'
    );
    if (selectedLanguage) {
      this.translateService.use(selectedLanguage);
      this.selectedLanguage = AVAILABLE_LANGUAGES.find(
        (lang) => lang.code === selectedLanguage
      )!;
    }
  }

  public changeIsSelectorOpen(): void {
    this.isLanguageSelectorOpen = !this.isLanguageSelectorOpen;
  }

  public filterLanguages(): Language[] {
    return this.languages.filter(
      (lang) => lang.code !== this.selectedLanguage.code
    );
  }

  public changeLanguage(lang: Language): void {
    this.selectedLanguage = lang;
    this.localStorageService.setToken('app-selected-language', lang.code);
    this.translateService.use(lang.code);
    this.changeIsSelectorOpen();
  }
}
