import { Component, Inject} from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { Observable } from 'rxjs';
import { VisionAnnotations, LabelAnnotation, TextAnnotation } from './labelAnnotation';
import { VisionAnnotationService } from './labelAnnotation.service';


export class Config {
  apiKey: string;
}

@Component({

  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls:  ['app.component.css'],
  providers: [VisionAnnotationService]
})
export class AppComponent {

  visionAnnotations : VisionAnnotations = new VisionAnnotations();
  labelAnnotations: LabelAnnotation[];
  textAnnotations: TextAnnotation[];
  apiKey : string;

  items: FirebaseListObservable<any[]>;
  constructor(private visionAnnotationService : VisionAnnotationService, private af: AngularFire) {

    let config : FirebaseObjectObservable<Config> = af.database.object("configs");

    let subscription = config.subscribe(
          value => {
              this.apiKey = value.apiKey;
              console.log("API Key:" + this.apiKey);
          }
    );
  }

  getVisionAnnotations(imageBase64: string): void {
    this.visionAnnotationService.getVisionAnnotations(this.apiKey, imageBase64).subscribe(
          value => {
              this.visionAnnotations = value;
              console.log(JSON.stringify(this.visionAnnotations));
          }
    );
    this.labelAnnotations = this.visionAnnotations.labelAnnotations;
  }

/**
 * Method called when the image is changed.
 */
 onImageChange(event) {
    let reader = new FileReader();

    reader.addEventListener("load", e => {

      // Keep only the base64
      let imageBase64 =reader.result.split(",")[1];
      this.getVisionAnnotations(imageBase64);
    }, false);

    let file = event.srcElement.files[0];
    reader.readAsDataURL(file);
  }

}

