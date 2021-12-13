import { Injectable } from '@angular/core';
import { ModalSettings } from 'src/app/shared/interfaces/modalSettings';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modals: any[] = [];

  add(modal: any) {
    this.modals.push(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  open(id: string, params: ModalSettings) {
    const modal = this.modals.find((x) => x.id === id);
    modal.open(params);
  }

  close(id: string) {
    const modal = this.modals.find((x) => x.id === id);
    modal.close();
  }
}
