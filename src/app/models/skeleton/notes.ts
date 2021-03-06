import {Annotator} from "./settings";

export class Note {

  document_index: number;
  deleted: boolean;
  ignored: boolean;
  color: string;
  container_id: number;
  index_start: number;
  index_end: number;
  timestamp_created: number;
  timestamp_deleted?: number;
  base_uri: string;
  current_text: string
  option: string
  text_left: string
  text_right: string
  existing_notes: Array<String>

  annotator: Annotator;

  constructor(
    index: number,
    range: JSON,
    data: JSON,
    color = "#ffffff"
  ) {

    this.document_index = index;
    this.deleted = false
    this.ignored = false
    this.color = color
    this.container_id = range["commonAncestorContainer"]["id"]
    this.index_start = 0
    this.index_end = 0
    this.timestamp_created = parseInt(data[0]["dataset"]["timestamp"])
    this.timestamp_deleted = 0
    this.base_uri = data[0]["baseURI"]
    this.current_text = data[0]["outerText"]
    this.option = "not_selected"
    this.text_left = ""
    this.text_right = ""
    this.existing_notes = Array<String>()
    let pieces = []
    if (range["endContainer"]) {
      Array.from(range["endContainer"]["childNodes"]).forEach((element: HTMLElement) => {
        if (element.childNodes.length > 0) {
          for (let i = 0; i < element.childNodes.length; i++) {
            let childElement: ChildNode = element.childNodes[i]
            let timestampCreated = parseInt(childElement.parentElement.getAttribute("data-timestamp"))
            if (this.timestamp_created == timestampCreated) {
              for (let piece of pieces) this.text_left = this.text_left.concat(piece)
              pieces = []
            } else {
              this.existing_notes.push(childElement.textContent)
              pieces.push(childElement.textContent)
            }
          }
        } else {
          pieces.push(element.textContent)
        }
      })
      for (let piece of pieces) this.text_right = this.text_right.concat(piece)
    }
    this.index_start = this.text_left.length
    this.index_end = this.text_left.length + this.current_text.length

  }

  public markDeleted() {
    this.deleted = true
  }

}
