import { Component, Input } from "@angular/core";
import { MdDialog, MdDialogRef } from "@angular/material";

@Component({
  selector: 'app-blog-dialog',
  template: `
<md-card-content md-dialog-content>Delete Forever?</md-card-content>
<md-card-actions md-dialog-actions>
  <button md-raised-button color="warn" md-dialog-close="yes">yes</button>
  <button md-raised-button color="accent" md-dialog-close="no">no</button>
</md-card-actions>

  `,
})
export class ConfirmDeleteDialog {
  constructor(public dialogRef: MdDialogRef<ConfirmDeleteDialog>) {}
}