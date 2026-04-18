import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from '@shared/toast/models/toast.models';

const TOAST_DURATION = 4000;

interface ToastMessage {
  title: string;
  description?: string;
}

@Injectable({providedIn: 'root'})
export class ToastService {
  public readonly toasts = signal<Toast[]>([]);

  private nextId: number = 0;

  public success(message: ToastMessage): void {
    const {title, description} = message;

    this.addToast('success', title, description);
  }

  public warning(message: ToastMessage): void {
    const {title, description} = message;

    this.addToast('warning', title, description);
  }

  public error(message: ToastMessage): void {
    const {title, description} = message;

    this.addToast('error', title, description);
  }

  public remove(id: number) {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  private addToast(type: ToastType, title: string, description?: string): void {
    const id = this.nextId++;

    this.toasts.update(toasts => [...toasts, {id, type, title, description}]);

    setTimeout(() => this.remove(id), TOAST_DURATION);
  }
}
