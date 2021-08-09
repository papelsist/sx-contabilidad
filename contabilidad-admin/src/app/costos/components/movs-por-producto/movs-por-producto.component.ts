import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Inventario } from 'app/models/inventario';

@Component({
  selector: 'sx-movs-por-producto',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './movs-por-producto.component.html'
})
export class MovsPorProductoComponent implements OnInit {
  @Input()
  producto: any;

  @Input()
  movimientos: Inventario[] = [];

  @Output()
  close = new EventEmitter();

  search: string;

  constructor() {}

  ngOnInit() {}

  onSearch(event: string) {}
}
