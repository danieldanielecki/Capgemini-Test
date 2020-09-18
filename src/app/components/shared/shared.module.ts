import { FlexLayoutModule } from "@angular/flex-layout";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { MaterialModule } from "./material.module";
import { MomentModule } from "ngx-moment";
import { NgModule } from "@angular/core";

const modules = [FlexLayoutModule, MaterialModule, MomentModule];

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  exports: [...modules, FooterComponent, HeaderComponent],
  imports: [...modules],
})
export class SharedModule {}
