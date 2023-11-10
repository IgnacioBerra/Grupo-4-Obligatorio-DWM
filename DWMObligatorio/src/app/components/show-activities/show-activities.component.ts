import { Component } from '@angular/core';
import { ActivitiyService } from '../../services/activitiy.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-activities',
  templateUrl: './show-activities.component.html',
  styleUrls: ['./show-activities.component.css']
})
export class ShowActivitiesComponent {

  activities!: Observable<any[]>;
  constructor(private activityService: ActivitiyService) {}

  ngOnInit() {
    const accessToken = localStorage.getItem('access_token');
    this.activities = this.activityService.getActivity(accessToken || 'null');
  }
  
}
