
export class LabelAnnotation {
  mid: string;
  description: string;
  score:number;
}


export class TextAnnotation {
  description: string;
}

export class VisionAnnotations {
  labelAnnotations : LabelAnnotation[];
  textAnnotations: TextAnnotation[];
}

