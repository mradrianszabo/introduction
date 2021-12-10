import { Component, OnInit } from '@angular/core';
import { PdfData, PdfService } from '../services/pdf.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  public pdfData : PdfData;
  public visible: boolean;

  constructor(private pdfService : PdfService, private notification : NotificationService) {
   }

  ngOnInit(): void {
    this.pdfService.pdfData.subscribe(params=>this.pdfData = params);
  }

  public closePdf() : void{
    this.pdfService.sendPdf(null);
  }

  public downloadPdf() : void{
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
        this.notification.success('A letöltés sikeresen megtörtént!');
        this.closePdf();
      },100)
    }catch(e){
      this.notification.error('Úgy tűnik, a link megsérült, ezért a letöltés sikertelen!');
    }
    });
  }

}
