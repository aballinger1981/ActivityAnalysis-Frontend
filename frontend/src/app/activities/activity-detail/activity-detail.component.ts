import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Activity, ActivityService } from '../activity.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
  animations: [  ]
})
export class ActivityDetailComponent implements OnInit {
  public activity$: Observable<any>;
  public pageIndex: number;
  public pageSize: number;
  public activitySplits: any[];
  public displayedColumns = ['distance_miles', 'pace', 'elevation_difference'];
  public dataSource: ActivityDataSource | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.activity$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.pageIndex = +params.get('page');
        this.pageSize = +params.get('per_page');
        const response = this.activityService.getActivity(params.get('id'));
        response.subscribe(activity => this.activitySplits = activity['splits_standard']);
        return response;
      });
    this.setNavData();
    this.dataSource = new ActivityDataSource(this.activityService,
      this.activitySplits);
  }

  public setNavData(): void {
    if (!this.activityService.athleteData) {
      if (!this.activityService.athleteId) {
        this.activityService.getAthlete();
      } else {
        this.activityService.getAthleteData();
      }
    }
  }

  public goToActivities(activity: Activity): void {
    const activityId = activity ? activity.id : null;
    // Pass along the activity id if available
    // So that the ActivityList component can select that activity.
    this.router.navigate(['/activity-list', { id: activityId, page: this.pageIndex, per_page: this.pageSize }]);
  }

}

export class ActivityDataSource extends DataSource<any> {

  constructor(
    private activityService: ActivityService,
    private activitySplits: any[]
  ) {
    super();
   }
  connect(): Observable<any> {
    console.log(this.activitySplits);
    return Observable.of(this.activitySplits);
  }

  disconnect() {

  }
}
