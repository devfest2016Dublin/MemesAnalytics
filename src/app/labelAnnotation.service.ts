import { Injectable} from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { Observable } from 'rxjs';
import { VisionAnnotations, LabelAnnotation, TextAnnotation } from './labelAnnotation';

export const LABEL_ANNOTATIONS: LabelAnnotation[] = [
  {mid: "1234", description: "House", score:99.99},
  {mid: "1234", description: "Villa", score:98.88},
  {mid: "1234", description: "Property", score:97.77}
];


@Injectable()
export class VisionAnnotationService {

  url : string = "https://vision.googleapis.com/v1/images:annotate?key=";

  configs : FirebaseObjectObservable<any>;

  constructor(private http: Http) {}

  getVisionAnnotations(apiKey: string, photoBase64: string): Observable<VisionAnnotations> {

    let request = {
        "requests": [
            {
                "features": [
                    {
                        "maxResults": 10,
                        "type": "LABEL_DETECTION"
                    },
                    {
                        "type":"TEXT_DETECTION",
                        "maxResults":10
                    }
                ],
                "image": {
                    "content":`${photoBase64}`
                }
            }
        ]
    };

    let body = JSON.stringify(request);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + apiKey, body, options)
               .map((r: Response) => r.json().responses[0] as VisionAnnotations);
  }
}
