import { RecordableSate } from '../models/recordable-state';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { StateStoreService } from '../services/state-store.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { State } from '../models/state';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-migrate-state',
  templateUrl: './migrate-state.component.html',
  styleUrls: ['./migrate-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MigrateStateComponent implements OnInit {
  date: Observable<Date>;
  exportUrl: Observable<SafeUrl>;
  file: File;

  constructor(private storeService: StateStoreService, private domSanitizer: DomSanitizer) {
    this.exportUrl = this.getDynamicExportUrl();
    this.date = Observable.interval(1000).map(() => new Date());
  }

  ngOnInit() {
  }

  getDynamicExportUrl(): Observable<SafeUrl> {
    const exportUrlObservable = this.storeService.getRecordObservableForType<State>()
        .distinctUntilChanged()
        .map(record => {
          const exportData = JSON.stringify(record);
          const exportUrl = URL.createObjectURL(new Blob([exportData], { type: 'application/json' }));

          console.log('record', record);

          return exportUrl;
        });
    const autoRevokedExportUrlObservable = 
      Observable.from([null])
      .concat(exportUrlObservable)
      .pairwise()
      .map(([oldUrl, newUrl]) => {
        URL.revokeObjectURL(oldUrl);

        console.log('oldUrl', oldUrl);
        console.log('newUrl', newUrl);

        return this.domSanitizer.bypassSecurityTrustUrl(newUrl);
      });

    return autoRevokedExportUrlObservable;
  }

  test(): void {
    this.storeService.dispatch({
      type: 'unused'
    });
  }

  fileChange(event) {
    console.log(event);
    this.file = event.target.files[0] as File;
  }

  import(): void {
    if (this.file == null) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const record = JSON.parse(fileReader.result) as RecordableSate<State>;

      this.storeService.import(record);
    };
    const importData = fileReader.readAsText(this.file);
  }
}
