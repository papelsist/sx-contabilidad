import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { CostoPromedio } from '../../models';

@Component({
  selector: 'sx-analisis-costo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './analisis-costo.component.html'
})
export class AnalisisCostoComponent implements OnInit {
  @Input()
  costo: CostoPromedio;
  @Output()
  close = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  onSearch(event: string) {}
}
