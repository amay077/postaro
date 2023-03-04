import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { checkUpdate } from '../misc/app-updater';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public readonly app_version = environment.app_version;
  // @ts-ignore
  public readonly build_at = `${window['build_at']}`;
  public latest_build_at = '';
  public availableUpdate: boolean = false;

  constructor() { }

  async checkUpdate(): Promise<boolean> {
    try {
      const res = await checkUpdate({ build_at: this.build_at });
      this.latest_build_at = res?.build_at ?? '';
      return res.hasUpdate;
    } catch (error) {
      console.warn('fetch version.json failed.', error);
      return false;
    }
  }

}
