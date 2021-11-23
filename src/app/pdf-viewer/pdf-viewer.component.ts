import { Component, Input, OnInit } from '@angular/core';
import { PdfData, PdfService } from '../pdf.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
  @Input() public pdfData : PdfData;
  public visible: boolean;

  constructor(private pdfService : PdfService, private notification : NotificationService) {
   }

  ngOnInit(): void {
  }

  closePdf(){
    this.pdfService.sendPdf(null);
  }

  downloadPdf(){
    this.pdfService.getPdf(this.pdfData.url).subscribe((data : any)=>{
      try{
      let downloadURL = window.URL.createObjectURL('data');
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download = `Szabo_Adrian_${this.pdfData.name}`;
      link.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      }));
      setTimeout(()=>{
        window.URL.revokeObjectURL(data);
        link.remove();
        this.notification.success('A letöltés sikeresen megtörtént!');
        this.closePdf();
      },100)
    }catch(e){
      this.notification.error('Úgy tűnik, a link megsérült, ezért a letöltés sikertelen!');
    }
    });
  }

}

/*


  downloadPdf(){
    this.pdfService.getPdf(this.pdfData.url).subscribe((data : any)=>{
      try{
        let downloadURL = window.URL.createObjectURL(data);
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = `Szabo_Adrian_${this.pdfData.name}`;
        link.dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        }));
        setTimeout(()=>{
          window.URL.revokeObjectURL(data);
          link.remove();
        },100);
      }catch(e){
      this.notification.error('Úgy tűnik, a link megsérült, ezért a letöltés sikertelen!')
      console.log('nev', this.pdfData)
      console.log('ajjaj: ', e)
      }
    });
    this.notification.success('A letöltés sikeresen megtörtént!');
    this.closePdf();
  }

*/
